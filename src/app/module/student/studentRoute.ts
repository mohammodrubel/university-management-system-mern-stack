import express from 'express'
import { studentController } from './studentController'

const router = express.Router()

router.get('/get-all-students', studentController.getAllStudentController)
router.get(
  '/get-signle-students/:id',
  studentController.getSingleStudentController,
)
router.delete(
  '/:id',
  studentController.studentSoftDeleteController,
)

export const studentRoutes = router
