import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterController } from "./academicSemesterController";
import academicSemesterUpdateValidation from "./academicSemesterUpdateValidation";
import AcademicSemesterSchemaValidation from "./academicSemesterValidation";

const router = Router()

    router.post('/create-academic-semester',validateRequest(AcademicSemesterSchemaValidation),
    AcademicSemesterController.createAcademicController)
    router.get('/',
    AcademicSemesterController.getAllAcademicController)
    router.get('/:id',
    AcademicSemesterController.getSingleAcademicController)
    router.put('/update-academic-semester/:id',validateRequest(academicSemesterUpdateValidation),
    AcademicSemesterController.updateSingleAcademicController)

export const academicSemester = router 