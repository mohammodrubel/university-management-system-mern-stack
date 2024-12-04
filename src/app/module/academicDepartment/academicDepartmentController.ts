import httpStatus from "http-status"
import CatchAsync from "../../utils/CatchAsync"
import sendResponce from "../../utils/sendResponce"
import { AcademicDepertmentService } from "./academicDepartmentsService"
import { AcademicDepertment } from "./academicDepertmentModel"

const createAcademicDepertmentController = CatchAsync(async (req,res,next)=>{
    const result = await AcademicDepertmentService.createAcademicDepertmentService(req.body)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'successfully create Academic Depertment',
        data:result
    })
})

const getAllAcademicDepertmentController =  CatchAsync(async (req,res,next)=>{
    const result = await AcademicDepertmentService.getAllAcademicDepertmentService()
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'All academic depertment retrieved successfully',
        data:result
    })
})


const getSingleAcademicController =  CatchAsync(async (req,res,next)=>{
    const id = req.params.id
    const result = await AcademicDepertmentService.getSingleAcademicDepertmentService(id)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"get Single academic depertment retrieved successfully",
        data:result
    })
})


const updateAcademicController  =  CatchAsync(async (req,res,next)=>{
    const id = req.params.id 
    const data = req.body
    const result = await AcademicDepertmentService.updateAcademicDepertmentService(id,req.body)
    sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'academic Academic Updated Faculty successfully',
        data:result
    })
})


const deleteAcademicController =  CatchAsync(async (req,res,next)=>{
    
})



export const AcademicDepertmentController = {
    createAcademicDepertmentController,
    getAllAcademicDepertmentController,
    getSingleAcademicController,
    updateAcademicController,
    deleteAcademicController
}