import { TacademicFaculty } from "./academicFacultyInterface"
import { AcademicFaculty } from "./academicFacultyModel"

const createAcademicFacultyService = async(payload:TacademicFaculty)=>{
    const result = await AcademicFaculty.create(payload)
    return result
}
const getAllAcademicFacultyService = async()=>{
    const result = await AcademicFaculty.find()
    return  result
}
const getSingleAcademicFacultyService = async(id:string)=>{
    const result = await AcademicFaculty.findById(id)
    return result
}
const updateAademicFacultyService = async(id:string,data:TacademicFaculty)=>{
    const reuslt = await AcademicFaculty.findByIdAndUpdate(id,data,{new:true})
    return reuslt
}



export const AcademicFacultyService = {
    createAcademicFacultyService,
    getAllAcademicFacultyService,
    getSingleAcademicFacultyService,
    updateAademicFacultyService
}