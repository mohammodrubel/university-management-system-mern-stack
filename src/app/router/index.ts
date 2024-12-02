import { Router } from "express";
import { studentRoutes } from "../module/student/studentRoute";
import { usreRouter } from "../module/user/userRoute";
import { academicSemester } from "../module/academicSemester/academicSemesterRouter";

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
]

webRouter.forEach(route => router.use(route.path, route.routes))


export default router 