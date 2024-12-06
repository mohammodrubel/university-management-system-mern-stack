import express from 'express'
import { studentController } from './studentController'
import validateRequest from '../../middleware/validateRequest'
import StudentValidationUpdateSchemaForZod from './updateValidationForZod'

const router = express.Router()

router.get('/get-all-students', studentController.getAllStudentController)
router.get(
  '/get-signle-students/:id',
  studentController.getSingleStudentController,
)
router.patch(
  '/update-student/:id',
  validateRequest(StudentValidationUpdateSchemaForZod),
  studentController.studentupdateController,
)
router.delete('/:id', studentController.studentSoftDeleteController)

export const studentRoutes = router
