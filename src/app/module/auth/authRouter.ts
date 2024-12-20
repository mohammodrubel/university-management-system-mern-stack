import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import loginValidation from "./authValidation";
import { authController } from "./authController";

const router = Router()

    router.post('/login',validateRequest(loginValidation),authController.loginUserController)
    


export const  authRouter = router 