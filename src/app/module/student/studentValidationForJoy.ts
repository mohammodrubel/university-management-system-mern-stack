import Joi from 'joi'

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(5).max(20).required().messages({
    'string.min': 'First name must be at least 5 characters long.',
    'string.max': 'First name cannot exceed 20 characters.',
    'any.required': 'First name is required.',
  }),
  middleName: Joi.string().required().messages({
    'any.required': 'Middle name is required.',
  }),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'any.required': 'Last name is required.',
      'string.pattern.base': '{#value} is not a valid name.',
    }),
})

const GuardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's name is required.",
  }),
  motherName: Joi.string().required().messages({
    'any.required': "Mother's name is required.",
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': "Father's occupation is required.",
  }),
  motherContactNumber: Joi.string().required().messages({
    'any.required': "Mother's contact number is required.",
  }),
  fatherContactNumber: Joi.string().required().messages({
    'any.required': "Father's contact number is required.",
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': "Mother's occupation is required.",
  }),
})

export const StudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required.',
  }),
  name: UserNameValidationSchema.required(),
  gender: Joi.string().required().valid('Male', 'Female').messages({
    'any.required': 'Gender is required.',
    'any.only': 'Gender must be either Male or Female.',
  }),
  bloodGroup: Joi.string()
    .required()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.required': 'Blood group is required.',
      'any.only': 'Invalid blood group value.',
    }),
  dateOfBirth: Joi.string().required().messages({
    'any.required': 'Date of birth is required.',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  contactNumber: Joi.string().required().messages({
    'any.required': 'Contact number is required.',
  }),
  avatar: Joi.string().required().messages({
    'any.required': 'Avatar is required.',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required.',
  }),
  guardian: GuardianValidationSchema.required(),
  isActive: Joi.string()
    .required()
    .valid('Active', 'inActive')
    .default('Active')
    .messages({
      'any.required': 'Active status is required.',
      'any.only': 'Active status must be either Active or inActive.',
    }),
  localeGuardian: Joi.string().required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required.',
  }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required.',
  }),
  profileImage: Joi.string().optional(),
})
