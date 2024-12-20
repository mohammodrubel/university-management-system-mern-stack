import { Router } from "express";
import { FacultyController } from "./facultyController";
import auth from "../../middleware/auth";
import { USER__ROLE } from "../user/user.constant";

const router = Router()

    router.get(`/get-all-faculty`,auth(USER__ROLE.admin),FacultyController.getAllFacultyController)
    router.get(`/get-single-faculty/:id`,FacultyController.getSingleFacultyController)
    router.put(`/update-faculty/:id`,FacultyController.updateFacultyController)
    router.delete(`/delete-faculty/:id`,FacultyController.deleteFacultyController)



export const facultyRouter =router