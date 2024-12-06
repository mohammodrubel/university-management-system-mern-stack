import mongoose from 'mongoose'
import { Student } from './studentModel'
import { User } from '../user/userModel'
import AppError from '../../middleware/App__Error'
import httpStatus from 'http-status'
import { TStudent } from './studentInterface'


const getAllStudentService = async () => {
  const result = await Student.find({ isDeleted: { $ne: true } })
    .populate('admissionSemester')
    .populate('user')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate('user')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
const softDeleteStudentService = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // transection 1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    //  transection 2
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete User')
    }
    await session.commitTransaction()
    await session.endSession()

    const result = await Student.findOne({ id })
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('faild to delete users')
  }
}

const updateStudentService = async (id: string, data: Partial<TStudent>) => {
  const {name,guardian,localeGuardian,...remainingStudentData} = data
  const modifyUpdatedData :Record<string,unknown>  = {...remainingStudentData}

  // name 
  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifyUpdatedData[`name.${key}`]=value
    }
  }
  // guardina 
  if(guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifyUpdatedData[`guardian.${key}`]=value
    }
  }
  // localeGuardian 
  if(localeGuardian && Object.keys(localeGuardian).length){
    for(const [key,value] of Object.entries(localeGuardian)){
      modifyUpdatedData[`localeGuardian.${key}`]=value
    }
  }
  console.log(modifyUpdatedData)
    const reuslt =  await Student.findOneAndUpdate({id},modifyUpdatedData,{new:true,runValidators:true})
    return reuslt
}

export const StudentServices = {
  getAllStudentService,
  getSingleStudentService,
  softDeleteStudentService,
  updateStudentService,
}
