import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { courseController } from "./courseController";
import { courseFacultyValidation, courseSchemaValidation, courseUpdateSchemaValidation } from "./courseValidation";

const router = Router()

router.post('/create-course', validateRequest(courseSchemaValidation), courseController.createCourseController)

router.get('/get-all-course', courseController.getAllourseController)

router.get('/get-single-course/:id', courseController.getSingleCourseController)

router.patch('/get-update-course/:id', validateRequest(courseUpdateSchemaValidation), courseController.updateCourseController)

router.put('/:courseId/assign-faculties',validateRequest(courseFacultyValidation),courseController.assignFacultyCourseController)

router.delete('/:courseId/remove-faculties',validateRequest(courseFacultyValidation),courseController.removeFacultyCourseController)

router.delete('/delete-course/:id', courseController.softDeleteCourseController)






export const courseRouter = router 