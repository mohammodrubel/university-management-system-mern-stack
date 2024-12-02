import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import StudentValidationSchemaForZod from '../student/studentValidationForZod'
import { userController } from './userController'

const router = express.Router()


router.post(
  '/create-student',
  validateRequest(StudentValidationSchemaForZod),
  userController.createStudentController,
)

export const usreRouter = router
