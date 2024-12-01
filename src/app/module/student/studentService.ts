import { TStudent } from './studentInterface'
import { Student } from './studentModel'


const getAllStudentService = async () => {
  const result = await Student.find({ isDeleted: { $ne: true } });

  return result
}

const getSingleStudentService = async (id: string) => {
  const result = await Student.findById(id)
  return result
}
const softDeleteStudentService = async (id: string) => {
  const result = await Student.updateOne({id},{isDeleted:true})
  return result
}

export const StudentServices = {
  getAllStudentService,
  getSingleStudentService,
  softDeleteStudentService
}
