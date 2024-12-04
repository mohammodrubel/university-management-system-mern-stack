import { TStudent } from './studentInterface'
import { Student } from './studentModel'


const getAllStudentService = async () => {
  const result = await Student.find({ isDeleted: { $ne: true } })
    .populate('admissionSemester').populate('user').populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty'
      }
    });;
  return result
}

const getSingleStudentService = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate('user')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty'
      }
    });
  return result
}
const softDeleteStudentService = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result
}

export const StudentServices = {
  getAllStudentService,
  getSingleStudentService,
  softDeleteStudentService
}


