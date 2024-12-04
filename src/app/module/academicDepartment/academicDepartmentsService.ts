import { TacademicDepertment } from "./academicDepartmentInterface"
import { AcademicDepertment } from "./academicDepertmentModel"

const createAcademicDepertmentService = async (payload: TacademicDepertment) => {

    
    const reuslt = await AcademicDepertment.create(payload)
    return reuslt
}

const getAllAcademicDepertmentService = async () => {
    const reuslt = await AcademicDepertment.find().populate("academicFaculty").populate('admissionSemester')
    return reuslt
}

const getSingleAcademicDepertmentService = async (id: string) => {
    const reuslt = await AcademicDepertment.findById(id).populate('academicFaculty')
    return reuslt
}

const updateAcademicDepertmentService = async (id: string, payload: TacademicDepertment) => {
    const reuslt = await AcademicDepertment.findByIdAndUpdate(id, payload, { new: true })
    return reuslt
}

export const AcademicDepertmentService = {
    createAcademicDepertmentService,
    getAllAcademicDepertmentService,
    getSingleAcademicDepertmentService,
    updateAcademicDepertmentService
}