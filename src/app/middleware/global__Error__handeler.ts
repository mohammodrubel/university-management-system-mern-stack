import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err?.status || 500; // Use err.status if provided
  let message = err?.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: err, 
  });
};

export default globalErrorHandler;
