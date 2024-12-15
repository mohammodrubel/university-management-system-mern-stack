import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { offerCourseService } from "./offerCourseService";

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

})
const getSingleCourseController = CatchAsync(async (req,res,next)=>{

})
const updateCourseController = CatchAsync(async (req,res,next)=>{

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