import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import sendResponce from '../../utils/sendResponce'
import { StudentServices } from './studentService'

const getAllStudentController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentService()
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all student successfully',
      data: result,
    })
  },
)
const getSingleStudentController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await StudentServices.getSingleStudentService(id)

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get Single student successfully',
      data: result,
    })
  },
)
const studentSoftDeleteController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await StudentServices.softDeleteStudentService(id)

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'delete student successfully',
      data: result,
    })
  },
)

const studentupdateController = CatchAsync(async(req:Request,res:Response,_next:NextFunction)=>{
    const id = req.params.id 
    const {student} = req.body 
    const result = await StudentServices.updateStudentService(id,student)

    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'student update successfully',
        data:result
    })
})

export const studentController = {
  getAllStudentController,
  getSingleStudentController,
  studentSoftDeleteController,
  studentupdateController
}
