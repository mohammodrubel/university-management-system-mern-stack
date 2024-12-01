import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponce from '../../utils/sendResponce'
import { StudentServices } from './studentService'


const getAllStudentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentService()
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all student successfully',
      data: result
    })
  } catch (error: any) {
    next(error)
  }
}
const getSingleStudentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const result = await StudentServices.getSingleStudentService(id)

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get Single student successfully',
      data: result
    })
  } catch (error: any) {
    next(error)
  }
}
const studentSoftDeleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const result = await StudentServices.softDeleteStudentService(id)

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'delete student successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const studentController = {
  getAllStudentController,
  getSingleStudentController,
  studentSoftDeleteController
}
