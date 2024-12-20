import bcrypt from 'bcrypt'
import httpStatus from "http-status"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config"
import AppError from "../../ERROR/App__Error"
import { User } from "../user/userModel"
import createToken from "./auth.utils"
import { TloginUser } from "./authInterface"
const loginService = async (payload: TloginUser) => {
    // Check if user exists
    const user = await User.findOne({ id: payload?.id });
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
    const plainPassword = payload.password;
    const hashedPassword = user?.password;

    if (!hashedPassword) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User password not found.');
    }

    const checkPassword = await bcrypt.compare(plainPassword, hashedPassword);
    if (!checkPassword) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'The provided password is incorrect.');
    }

    // create token sent to the client
    const jwtPayload = {
        id: user?.id,
        role: user?.role
    }
    const accessToken = createToken(jwtPayload, config.jwt__access__token__secret as string, config.jwt__access__token__expire__in as string)
    const refreshToken = createToken(jwtPayload, config.jwt__refresh__toekn__secret as string, config.jwt__refresh__token__expire__in as string)

    return {
        accessToken,
        needPasswordChange: user?.needPasswordChange,
        refreshToken
    }

};

const refreshToken = async (token: string) => {

    const decoded = jwt.verify(token, config.jwt__refresh__toekn__secret as string) as JwtPayload

    const { id } = decoded
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

    // create token sent to the client
    const jwtPayload = {
        id: user?.id,
        role: user?.role
    }
    const accessToken = createToken(jwtPayload, config.jwt__access__token__secret as string, config.jwt__access__token__expire__in as string)

    return accessToken
}

export const authService = {
    loginService,
    refreshToken
}