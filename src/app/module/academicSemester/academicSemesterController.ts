import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { academicSemesterService } from "./academicSemesterService";

const createAcademicController = CatchAsync(async(req,res)=>{
    const result = await academicSemesterService.createAcademicSemesterService(req.body)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'academic semester created successfully',
        data:result
    })
})
const getAllAcademicController = CatchAsync(async(req,res)=>{
    const result = await academicSemesterService.getAllAcademicSemesterService()
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'get All academic semester successfully',
        data:result
    })
})
const getSingleAcademicController = CatchAsync(async(req,res)=>{
    const id = req?.params?.id
    const result = await academicSemesterService.getSingleAcademicSemesterService(id)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'get All academic semester successfully',
        data:result
    })
})
const updateSingleAcademicController = CatchAsync(async(req,res)=>{
    const id = req?.params?.id
    const data = req.body 
    const result = await academicSemesterService.updateSingleAcademicSemesterService(id,data)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Update academic semester successfully',
        data:result
    })
})


export const AcademicSemesterController ={
    createAcademicController,
    getAllAcademicController,
    getSingleAcademicController,
    updateSingleAcademicController
} 