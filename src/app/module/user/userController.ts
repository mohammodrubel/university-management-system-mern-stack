import { NextFunction, Request, Response } from "express"
import { UserService } from "./userService"
import sendResponce from "../../utils/sendResponce"
import httpStatus from "http-status"

const createStudentController = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const {password, student } = req.body

    //   if password not given use default password 

   
     const result = await UserService.createStudentService(password,student)
  
      res.status(200).json({
        success: true,
        message: 'student is created successfully',
        data: result,
      })
      sendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'student created successfully',
        data:result
      })
    } catch (error) {
      next(error)
    }
  }

  export const userController = {
    createStudentController
  }