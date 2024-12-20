import { NextFunction, Request, Response } from "express";
import CatchAsync from "../utils/CatchAsync";
import AppError from "../ERROR/App__Error";
import httpStatus from "http-status";
import { TUserRoleTYpe } from "../module/user/user.constant";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/user/userModel";
import { debugPort } from "process";

const auth = (...requiredRoles: TUserRoleTYpe[]) => {
    return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        const decoded = jwt.verify(token, config.jwt__access__token__secret as string) as JwtPayload

        const {role,id} = decoded
        // Check if user exists
        const user = await User.findOne({ id });
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
        }

        // Check if user is deleted
        const isDeleted = user?.isDeleted;
        if (isDeleted) {
            throw new AppError(httpStatus.GONE, 'This user account has been deleted.');
        }

        // Check if user is blocked
        const isBlocked = user?.status === 'blocked';
        if (isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user account is currently blocked.');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized!')
        }

        next();
    });
};

export default auth;
