import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { AcademicFacultyService } from "./academicFacultyService";

const createAcademicFacultyController = CatchAsync(async (req,res,next)=>{
    const result = await AcademicFacultyService.createAcademicFacultyService(req.body)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Create academic Academic Faculty successfully',
        data:result
    })
})
const getAllAcademicFacultyController = CatchAsync(async (_req,res,next)=>{
    const result = await AcademicFacultyController.getAllAcademicFacultyController
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'All academic faculties retrieved successfully',
        data: result
    })

})
const getSingleAcademicFacultyController = CatchAsync(async (req,res,next)=>{
    const id = req.params.id 
    const result = await AcademicFacultyService.getSingleAcademicFacultyService(id) 
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'get Single academic faculties retrieved successfully',
        data:result
    })
})
const updateAcademicFacultyController = CatchAsync(async (req,res,next)=>{
    const id = req.params.id 
    const data = req.body 
    const result = await AcademicFacultyService.updateAademicFacultyService(id,data)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'academic Academic Updated Faculty successfully',
        data:result
    })
})


export const AcademicFacultyController = {
    createAcademicFacultyController,
    getAllAcademicFacultyController,
    getSingleAcademicFacultyController,
    updateAcademicFacultyController
}