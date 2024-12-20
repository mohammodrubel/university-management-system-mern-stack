import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { authService } from "./authService";
import config from "../../config";

const loginUserController = CatchAsync(async (req,res,next)=>{
    const result = await authService.loginService(req.body)
    const {accessToken,refreshToken,needPasswordChange} =  result
    res.cookie('refreshToken',refreshToken,{
        secure:config.node__Env === 'production',
        httpOnly:true
    })
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'login successfully',
        data:{
            accessToken,
            needPasswordChange
        } 
    })
})




export const authController = {
    loginUserController
}