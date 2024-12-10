import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { AdminService } from "./adminService";

const getAllAdminController = CatchAsync(async (req,res,next)=>{
    const result = await AdminService.getAllAdminService()
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'all admin retrieved successfully',
        data:result
    })
})
const getSingleAdminController = CatchAsync(async (req,res,next)=>{
    const result = await AdminService.getSingleAdminService(req.params.id)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'single admin retrieved successfully',
        data:result
    })
})
const updateAdminController = CatchAsync(async (req,res,next)=>{
    const result = await AdminService.updateAdminService(req.params.id,req.body)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'single admin retrieved successfully',
        data:result
    })
    })
const deleteAdminController = CatchAsync(async (req,res,next)=>{
    const result = await AdminService.softDeleteAdminService(req.params.id)
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'single admin retrieved successfully',
        data:result
    })
})


export const AdminController = {
    getAllAdminController,
    getSingleAdminController,
    updateAdminController,
    deleteAdminController
}