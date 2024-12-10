import QueryBuilder from "../../builder/QueryBuilder"
import { TFaculty } from "./facultyInterface"
import { Faculty } from "./facultyModel"
import { facultySearchableFields } from "./facultySearchableFields"

const getAllFacultyService = async (query:Record<string,unknown>) => {
    const facultyQuery = new QueryBuilder(Faculty.find(),query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields()

    const reuslt = await facultyQuery.modelQuery
    return reuslt
}

const getSingleFacultyService = async (id: string) => {
    const result = await Faculty.findById(id)
    return result
}

const updateSingleFacultyService = async (id: string, payload: Partial<TFaculty>) => {
    const {name,...remainingData} = payload
    const modifyUpdateData :Record<string,unknown> = {...remainingData}

    if(name && Object.keys(name).length){
        for(const [key,values] of Object.entries(name)){
            modifyUpdateData[`name.${key}`]=values
        }
    }
    const reuslt = await Faculty.findByIdAndUpdate(id,modifyUpdateData,{new:true})
    return reuslt
}
  

const softDeleteFacultyService = async (id: string) => {
    const result = await Faculty.findByIdAndUpdate(id,{iDeleted:true},{new:true})
    return result
}

export const FacultyService = {
    getAllFacultyService,
    getSingleFacultyService,
    updateSingleFacultyService,
    softDeleteFacultyService
}