import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "./App__Error";
import { errorSourceType } from "./ErrorType";
import handleZodError from "./handle__zod__error";
import mongooseCastErrors from "./mongoose__Cast__Error";
import MongooseValidationError from "./Mongoose__Validation__Error";
import mongooseDuplicateError from "./mongooseDuplicateErrors";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // st deatult vlaue 
    let statusCode =  500;
    let message =  "Something went wrong";
    let errorSource: errorSourceType = [
        {
            path: '',
            message: 'somthing went wrong'
        }
    ]

    if (err instanceof ZodError) {
        const ZodModifyError = handleZodError(err)
        statusCode = ZodModifyError.statusCode,
            message = ZodModifyError.message,
            errorSource = ZodModifyError.errorSource

    } else if (err?.name === 'ValidationError') {
        const mongooseErrorModify = MongooseValidationError(err)
        statusCode = mongooseErrorModify.statusCode,
            message = mongooseErrorModify.message,
            errorSource = mongooseErrorModify.errorSource

    } else if (err?.name === 'CastError') {
        const mongooseCastError = mongooseCastErrors(err)
        statusCode = mongooseCastError.statusCode,
            message = mongooseCastError.message,
            errorSource = mongooseCastError.errorSource

    } else if (err.code === 11000) {
        const mongooseDeplicateError = mongooseDuplicateError(err)
            statusCode = mongooseDeplicateError.statusCode,
            message = mongooseDeplicateError.message,
            errorSource = mongooseDeplicateError.errorSource

    }else if(err instanceof AppError){
        statusCode = err?.statusCode,
        message = err?.message,
        errorSource = [
            {
                path:'',
                message:err?.message
            }
        ]
    }else if(err instanceof Error){
        message = err?.message,
        errorSource = [
            {
                path:'',
                message:err?.message
            }
        ]
    }



    // main return error 
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
        err,
        stack: config.node__Env === 'development' ? err?.stack : ''
    });
};

export default globalErrorHandler;



