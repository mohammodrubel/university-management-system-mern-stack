import { Router } from "express";
import { studentRoutes } from "../module/student/studentRoute";
import { usreRouter } from "../module/user/userRoute";

const router = Router()

const webRouter = [
    {
        path: '/users',
        routes: studentRoutes
    },
    {
        path: '/students',
        routes: usreRouter
    },
]

webRouter.forEach(route => router.use(route.path, route.routes))


export default router 