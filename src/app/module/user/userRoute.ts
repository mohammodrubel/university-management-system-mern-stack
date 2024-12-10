import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import StudentValidationSchemaForZod from '../student/studentValidationForZod'
import { userController } from './userController'
import TadminSchemaVaidation from '../admin/adminValidation'
import facultyValidationSchema from '../faculty/facultyValidation'

const router = express.Router()


router.post(
  '/create-student',
  validateRequest(StudentValidationSchemaForZod),
  userController.createStudentController,
)
router.post(
  '/create-admin',
  validateRequest(TadminSchemaVaidation),
  userController.createAdminController,
)
router.post(
  '/create-faculty',
  validateRequest(facultyValidationSchema),
  userController.createFacultyController,
)

export const usreRouter = router
