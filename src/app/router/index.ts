import { Router } from "express";
import { studentRoutes } from "../module/student/studentRoute";
import { usreRouter } from "../module/user/userRoute";
import { academicSemester } from "../module/academicSemester/academicSemesterRouter";
import { academicFacultyRouter } from "../module/academicFaculty/academicFacultyRouter";
import { academicDepertmentRouter } from "../module/academicDepartment/academicDepartmentRouter";

const router = Router()

const webRouter = [
    {
        path: '/users',
        routes:  usreRouter
    },
    {
        path: '/students',
        routes: studentRoutes
    },
    {
        path: '/academic-semesters',
        routes: academicSemester
    },
    {
        path: '/academic-faculty',
        routes: academicFacultyRouter
    },
    {
        path: '/academic-depertment',
        routes: academicDepertmentRouter
    },
]

webRouter.forEach(route => router.use(route.path, route.routes))


export default router 