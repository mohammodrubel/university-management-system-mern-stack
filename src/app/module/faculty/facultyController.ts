import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { FacultyService } from "./facultyService";

const getAllFacultyController = CatchAsync(async (req, res, next) => {
    const result = await FacultyService.getAllFacultyService(req.query)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all Faculty retrieved successfully',
        data: result
    })
})

const getSingleFacultyController = CatchAsync(async (req, res, next) => {
    const result = await FacultyService.getSingleFacultyService(req.params.id)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single Faculty retrieved successfully',
        data: result
    })
})

const updateFacultyController = CatchAsync(async (req, res, next) => {
    const result = await FacultyService.updateSingleFacultyService(req.params.id, req.body)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty update successfully',
        data: result
    })
})

const deleteFacultyController = CatchAsync(async (req, res, next) => {
    const result = await FacultyService.softDeleteFacultyService(req.params.id)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Remove Faculty successfully',
        data: result
    })
})


export const FacultyController = {
    getAllFacultyController,
    getSingleFacultyController,
    updateFacultyController,
    deleteFacultyController
}