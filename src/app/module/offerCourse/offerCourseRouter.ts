import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { offerCourseController } from "./offerCourseController";
import { offerCourseSchemaValidation, offerCourseUpdateSchemaValidation } from "./orrerCourseValidation";


const router = Router()

    router.post('/create-offer-course',validateRequest(offerCourseSchemaValidation),offerCourseController.createCourseController)

    router.get('/get-all-offer-course',offerCourseController.getAllCourseController)

    router.get('/get-single-offer-course/:id',offerCourseController.getSingleCourseController)

    router.patch('/update-offer-course/:id',validateRequest(offerCourseUpdateSchemaValidation),offerCourseController.updateCourseController)
    
    router.delete('/delete-offer-course/:id',offerCourseController.softDeleteCourseController)


export const offerCourseRouetr = router 