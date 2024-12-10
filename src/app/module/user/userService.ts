import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../ERROR/App__Error'
import { AcademicSemester } from '../academicSemester/academicSemesterModel'
import { TStudent } from '../student/studentInterface'
import { Student } from '../student/studentModel'
import genarateStudentId from './user.utils'
import { TUser } from './userInterface'
import { User } from './userModel'
import Tadmin from '../admin/adminInterface'
import generateAdminId from './admin.utils'
import { Admin } from '../admin/adminModel'
import { TFaculty } from '../faculty/facultyInterface'
import generateFacultyId from '../faculty/facultyGenarateId'
import { Faculty } from '../faculty/facultyModel'

const createAdminService = async (password: string, admin: Tadmin) => {
    let userdata: Partial<TUser> = {}
  
    // If password is not provided, use default password
    userdata.password = password !== undefined ? password : (config.default__password as string);
    // Set student role
    userdata.role = 'admin';
  
   
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      // Generate manual ID
      userdata.id = await generateAdminId();
     
  
      // Transaction 1: Create user
      const newUser = await User.create([userdata], { session });
  
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
  
      // Set IDs for student reference
      admin.id = newUser[0].id;
      admin.user = newUser[0]._id;
  
      // Transaction 2: Create student
      const newAdmin = await Admin.create([admin], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
      }
  
      await session.commitTransaction();
      return newAdmin;
    } catch (error) {
      await session.abortTransaction();
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    } finally {
      session.endSession();
    }
  };
const createFaculutyService = async (password: string, faculty: TFaculty) => {
    let userdata: Partial<TUser> = {}
  
    // If password is not provided, use default password
    userdata.password = password !== undefined ? password : (config.default__password as string);
    // Set student role
    userdata.role = 'faculty';
  
  
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      // Generate manual ID
      userdata.id = await generateFacultyId();
      // Transaction 1: Create user
      const newUser = await User.create([userdata], { session });
  
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
  
      // Set IDs for student reference
      faculty.id = newUser[0].id;
      faculty.user = newUser[0]._id;
  
      // Transaction 2: Create student
      const newFaculty = await Faculty.create([faculty], { session });
  
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
      }
  
      await session.commitTransaction();
      return newFaculty;
    } catch (error) {
      await session.abortTransaction();
      throw new Error('faild to create Faculty')
      console.log(error)
      // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create studenttttt');
    }
  };
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
      console.log(error)
      // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create studenttttt');
    }
  };
  

export const UserService = {
  createStudentService,
  createAdminService,
  createFaculutyService
}
