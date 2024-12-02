import { academicSemesterNameAndCode } from "./academicSemesterConstant";
import { TAaademicSemester } from "./academicSemesterInterface";
import { AcademicSemester } from "./academicSemesterModel";



const createAcademicSemesterService = async (payload: TAaademicSemester) => {

    // check academic semester name code and user send payload name code 
    if (academicSemesterNameAndCode[payload.name] !== payload.code) {
        throw new Error('The academic semester name and its corresponding code do not match.');
    }
    const result = await AcademicSemester.create(payload)
    return result
}

const getAllAcademicSemesterService = async () => {
    const result = await AcademicSemester.find({})
    return result
}

const getSingleAcademicSemesterService = async (id:string) => {
    const result = await AcademicSemester.findById(id)
    return result
}
const updateSingleAcademicSemesterService = async (id:string,payload:Partial <TAaademicSemester>) => {
    // check academic semester name code and user send payload name code 
    if (payload.name && payload.code && academicSemesterNameAndCode[payload.name] !== payload.code) {
        throw new Error('The academic semester name and its corresponding code do not match.');
    }
    
    const result = await AcademicSemester.findByIdAndUpdate(id,payload,{new:true})
    return result
}


export const academicSemesterService = {
    createAcademicSemesterService,
    getAllAcademicSemesterService,
    getSingleAcademicSemesterService,
    updateSingleAcademicSemesterService
}