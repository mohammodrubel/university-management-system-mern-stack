import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { semesterRegistrationValidation } from "./semesterRegistrationValidation";
import { semesterRegistrationService } from "./semesterRegistrationService";
import { semesterRegistrationController } from "./semesterRegistrationController";
import semesterRegistrationUpdateZodValidation from "./semesterRegistrationUpdate";

const router = Router()

    router.post('/create-semesterRegistration',validateRequest(semesterRegistrationValidation),semesterRegistrationController.createSemesterRegistrationController)

    router.get('/get-all-semesterRegistration',semesterRegistrationController.getAllSemesterRegistrationController)

    router.get('/get-single-semesterRegistration/:id',semesterRegistrationController.getSingleSemesterRegistrationController)

    router.put('/update-semesterRegistration/:id',validateRequest(semesterRegistrationUpdateZodValidation),semesterRegistrationController.updateSemesterRegistrationController)
    
    router.delete('/delete-semesterRegistration/:id',semesterRegistrationController.softDeleteSemesterRegistrationController)


export const semesterRegistrationRouetr = router 