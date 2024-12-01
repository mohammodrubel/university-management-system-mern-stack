import express from "express";
import { userController } from "./userController";


const router = express.Router()



router.post('/create-student',userController.createStudentController)

export const usreRouter = router