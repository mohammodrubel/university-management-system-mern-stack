import { Router } from "express";
import { AdminController } from "./adminController";

const router = Router()

router.get('/get-all-admin',AdminController.getAllAdminController)
router.get('/get-single-admin/:id',AdminController.getSingleAdminController)
router.put('/update/:id',AdminController.updateAdminController)
router.delete('/delete-admin/:id',AdminController.deleteAdminController)


export const AdminRouter = router