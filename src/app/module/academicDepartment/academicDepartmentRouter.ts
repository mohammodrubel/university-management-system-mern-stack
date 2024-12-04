import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepertmentController } from "./academicDepartmentController";
import academicDepertmentValidation from "./academicDepartmentValidation";
import updateacademicDepertmentValidation from "./academicDepertmentValidation";

const router = Router()

    router.post('/create-academic-depertment',validateRequest(academicDepertmentValidation),AcademicDepertmentController.createAcademicDepertmentController)

    
    router.get('/get-all-academic-depertment',AcademicDepertmentController.getAllAcademicDepertmentController)

    
    router.get('/get-single-academic-depertment/:id',AcademicDepertmentController.getSingleAcademicController)

    
    router.put('/get-update-academic-depertment/:id',validateRequest(updateacademicDepertmentValidation),AcademicDepertmentController.createAcademicDepertmentController)

    


export const academicDepertmentRouter = router 