import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponce from "../../utils/sendResponce";
import { semesterRegistrationService } from "./semesterRegistrationService";

const createSemesterRegistrationController = CatchAsync(async (req, res, next) => {
    const result = await semesterRegistrationService.CreatesemesterRegistrationService(req.body)
    sendResponce(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'create semester register successfully',
        data: result
    })
})
const getAllSemesterRegistrationController = CatchAsync(async (req, res, next) => {
    const result = await semesterRegistrationService.getAllsemesterRegistrationService(req.query)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all semester retrieve successfully',
        data: result
    })

})
const getSingleSemesterRegistrationController = CatchAsync(async (req, res, next) => {
    const result = await semesterRegistrationService.getSinglesemesterRegistrationService(req.params.id)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single semester retrieve successfully',
        data: result
    })

})
const updateSemesterRegistrationController = CatchAsync(async (req, res, next) => {
    const result = await semesterRegistrationService.updateSemesterRegistrationService(req.params.id,req.body)
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'update semester semester Registration successfully',
        data: result
    })
})
const softDeleteSemesterRegistrationController = CatchAsync(async (req, res, next) => {

})


export const semesterRegistrationController = {
    createSemesterRegistrationController,
    getAllSemesterRegistrationController,
    getSingleSemesterRegistrationController,
    updateSemesterRegistrationController,
    softDeleteSemesterRegistrationController
}

