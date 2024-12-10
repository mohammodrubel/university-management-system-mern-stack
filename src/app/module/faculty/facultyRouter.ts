import { Router } from "express";
import { FacultyController } from "./facultyController";

const router = Router()

    router.get(`/get-all-faculty`,FacultyController.getAllFacultyController)
    router.get(`/get-single-faculty/:id`,FacultyController.getSingleFacultyController)
    router.put(`/update-faculty/:id`,FacultyController.updateFacultyController)
    router.delete(`/delete-faculty/:id`,FacultyController.deleteFacultyController)



export const facultyRouter =router