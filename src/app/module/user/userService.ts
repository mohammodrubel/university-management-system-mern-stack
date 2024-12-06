import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../middleware/App__Error'
import { AcademicSemester } from '../academicSemester/academicSemesterModel'
import { TStudent } from '../student/studentInterface'
import { Student } from '../student/studentModel'
import genarateStudentId from './user.utils'
import { TUser } from './userInterface'
import { User } from './userModel'
const createStudentService = async (password: string, student: TStudent) => {
    let userdata: Partial<TUser> = {}
  
    // If password is not provided, use default password
    userdata.password = password !== undefined ? password : (config.default__password as string);
    // Set student role
    userdata.role = 'student';
  
    const admissionSemester = await AcademicSemester.findById(student.admissionSemester);
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      // Generate manual ID
      userdata.id = await genarateStudentId(admissionSemester);
  
      // Transaction 1: Create user
      const newUser = await User.create([userdata], { session });
  
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
  
      // Set IDs for student reference
      student.id = newUser[0].id;
      student.user = newUser[0]._id;
  
      // Transaction 2: Create student
      const newStudent = await Student.create([student], { session });
  
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }
  
      await session.commitTransaction();
      return newStudent;
    } catch (error) {
      await session.abortTransaction();
      throw new Error('faild to create student')
    }
  };
  

export const UserService = {
  createStudentService,
}
