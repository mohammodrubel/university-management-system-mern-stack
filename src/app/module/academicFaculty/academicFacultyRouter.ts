import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import academicFacultyValidation from "./academicFacultyValidation";
import { AcademicFacultyController } from "./academicFacultyController";

const router = Router()

    router.post('/create-academic-faculty',validateRequest(academicFacultyValidation),AcademicFacultyController.createAcademicFacultyController)

    router.get('/get-all-academic-faculty',AcademicFacultyController.getAllAcademicFacultyController)

    router.get('/get-single-academic-faculty/:id',AcademicFacultyController.getSingleAcademicFacultyController)

    router.put('/update-academic-faculty/:id',AcademicFacultyController.updateAcademicFacultyController)

export const academicFacultyRouter = router