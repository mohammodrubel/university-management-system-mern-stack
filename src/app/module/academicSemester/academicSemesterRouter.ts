import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterController } from "./academicSemesterController";
import AcademicSemesterSchemaValidation from "./academicSemesterValidation";

const router = Router()

    router.post('/create-academic-semester',validateRequest(AcademicSemesterSchemaValidation),
    AcademicSemesterController.createAcademicController)
    router.get('/',
    AcademicSemesterController.getAllAcademicController)
    router.get('/:id',
    AcademicSemesterController.getSingleAcademicController)
    router.put('/update-academic-semester/:id',validateRequest(AcademicSemesterSchemaValidation),
    AcademicSemesterController.updateSingleAcademicController)

export const academicSemester = router 