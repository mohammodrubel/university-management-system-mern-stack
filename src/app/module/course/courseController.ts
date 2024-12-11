import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { courseService } from "./courseService";

const createCourseController = CatchAsync(async(req,res,next)=>{
    console.log(req.body)
    const result = await courseService.createCourseService(req.body)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Course Created successfull',
        data:result
    })
})

const getAllourseController = CatchAsync(async(req,res,next)=>{
    const result = await courseService.getAllCourseService(req.query)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'get course retrieved successfully',
        data:result
    })
})


const getSingleCourseController = CatchAsync(async(req,res,next)=>{
    const result = await courseService.getSingleCourseService(req.params.id)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'get single course retrieved successfully',
        data:result
    })
})


const updateCourseController = CatchAsync(async(req,res,next)=>{
    const result = await courseService.updateCourseService(req.params.id ,req.body)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'update course successfully',
        data:result
    })
})

const softDeleteCourseController = CatchAsync(async(req,res,next)=>{
    const result = await courseService.softDeleteCourseService(req.params.id)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Delete Course successfully complete',
        data:result
    })
})
const assignFacultyCourseController = CatchAsync(async(req,res,next)=>{
    const {courseId} = req.params 
    const {faculties} = req.body
    console.log(courseId,faculties)
    const result = await courseService.assingFacultyControllerService(courseId,faculties)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculty Created successfull',
        data:result
    })
})
const removeFacultyCourseController = CatchAsync(async(req,res,next)=>{
    const {courseId} = req.params 
    const {faculties} = req.body
    console.log(courseId,faculties)
    const result = await courseService.removeFacultyControllerService(courseId,faculties)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculty remove successfull',
        data:result
    })
})

export const courseController = {
    createCourseController,
    getAllourseController,
    getSingleCourseController,
    updateCourseController,
    softDeleteCourseController,
    assignFacultyCourseController,
    removeFacultyCourseController
}