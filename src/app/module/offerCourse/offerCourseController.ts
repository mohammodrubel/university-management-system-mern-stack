import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { offerCourseService } from "./offerCourseService";
import { OfferCourse } from "./offerCourseModel";

const createCourseController = CatchAsync(async (req,res,next)=>{
    console.log(req.body,'controller')
    const result = await offerCourseService.createOfferCourseService(req.body)
    sendResponce(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'create offer course successfully',
        data: result
    })
    
})
const getAllCourseController = CatchAsync(async (req,res,next)=>{
    const result = offerCourseService.getSingleOfferCourseService
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all offer courses',
        data: result
    })
})
const getSingleCourseController = CatchAsync(async (req,res,next)=>{
    const id = req.params.id 
    const result =  offerCourseService.getSingleOfferCourseService(id)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single offer courses',
        data: result
    })
})
const updateCourseController = CatchAsync(async (req,res,next)=>{
    const payload = req.body 
    const id = req.params.id 
    const result = offerCourseService.updateOfferCourseService(payload,id)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get Update offer courses',
        data: result
    })
})
const softDeleteCourseController = CatchAsync(async (req,res,next)=>{

})


export const offerCourseController = {
    createCourseController,
    getAllCourseController,
    getSingleCourseController,
    updateCourseController,
    softDeleteCourseController
}