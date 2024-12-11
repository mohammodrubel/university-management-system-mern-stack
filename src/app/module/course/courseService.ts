import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse } from "./courseInterface";
import { Course } from "./courseModel";

const createCourseService = async(payload:TCourse)=>{
    const result = await Course.create(payload)
    return result
}

const getAllCourseService = async(quiry:Record<string,unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourse.course'),quiry)
    .search(['title','prefix','code'])
    .filter()
    .sort()
    .pagination()
    .fields()

    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseService = async (id:string)=>{
    const result = await Course.findById(id)
    return result
}

const updateCourseService = async(id:string,payload:Partial<TCourse>)=>{
    const result = await Course.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
    return result
}

const softDeleteCourseService = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

export const courseService = {
    createCourseService,
    getAllCourseService,
    getSingleCourseService,
    updateCourseService,
    softDeleteCourseService
}