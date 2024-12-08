import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import sendResponce from '../../utils/sendResponce'
import { UserService } from './userService'

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
}
