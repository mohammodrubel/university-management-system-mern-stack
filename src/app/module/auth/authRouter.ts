import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authController } from "./authController";
import loginValidation from "./authValidation";
import refreshTokenValidationSchema from "./tokenValidation";

const router = Router()

    router.post('/login',validateRequest(loginValidation),authController.loginUserController)
    router.post('/refresh-token',validateRequest(refreshTokenValidationSchema),authController.refreshTokenController)


export const  authRouter = router 