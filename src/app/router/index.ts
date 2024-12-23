import { Router } from "express";
import { academicDepertmentRouter } from "../module/academicDepartment/academicDepartmentRouter";
import { academicFacultyRouter } from "../module/academicFaculty/academicFacultyRouter";
import { academicSemester } from "../module/academicSemester/academicSemesterRouter";
import { AdminRouter } from "../module/admin/adminRouter";
import { courseRouter } from "../module/course/courseRouter";
import { facultyRouter } from "../module/faculty/facultyRouter";
import { studentRoutes } from "../module/student/studentRoute";
import { usreRouter } from "../module/user/userRoute";
import { semesterRegistrationRouetr } from "../module/semesterRegistration/semesterRegistrationRouter";
import { offerCourseRouetr } from "../module/offerCourse/offerCourseRouter";
import { authRouter } from "../module/auth/authRouter";

const router = Router()

const webRouter = [
    {
        path: '/admin',
        routes: AdminRouter
    },
    {
        path: '/users',
        routes: usreRouter
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
    {
        path: '/faculty',
        routes: facultyRouter
    },
    {
        path: '/course',
        routes: courseRouter
    },
    {
        path: '/semester-registr',
        routes: semesterRegistrationRouetr
    },
    {
        path: '/offer-course',
        routes: offerCourseRouetr
    },
    {
        path:'/auth',
        routes:authRouter
    }
]

webRouter.forEach(route => router.use(route.path, route.routes))


export default router 