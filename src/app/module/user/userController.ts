import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import sendResponce from '../../utils/sendResponce'
import { UserService } from './userService'

const createAdminController = CatchAsync(async(req,res,next)=>{
  const {password,admin} = req.body 
  const result = await UserService.createAdminService(password,admin)
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})
const createFacultyController = CatchAsync(async(req,res,next)=>{
  const {password,faculty} = req.body 
  const result = await UserService.createFaculutyService(password,faculty)
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const createStudentController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student } = req.body
    //   if password not given use default password
    const result = await UserService.createStudentService(password, student)
    sendResponce(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'student created successfully',
      data: result,
    })
  },
)

export const userController = {
  createStudentController,
  createAdminController,
  createFacultyController
}
