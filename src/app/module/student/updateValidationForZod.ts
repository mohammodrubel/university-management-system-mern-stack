import { z } from 'zod'

const LocaleGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required.' }).optional(),
  occupation: z
    .string({
      required_error: 'Local guardian occupation is required.',
    })
    .optional(),
  middleName: z
    .string({
      required_error: 'Local guardian middle name is required.',
    })
    .optional(),
  lastName: z
    .string({
      required_error: 'Local guardian last name is required.',
    })
    .optional(),
})

const StudentValidationUpdateSchemaForZod = z.object({
  body: z
    .object({
      student: z
        .object({
          name: z
            .object({
              firstName: z
                .string()
                .min(5, {
                  message: 'First name must be at least 5 characters long.',
                })
                .max(20, {
                  message: 'First name cannot exceed 20 characters.',
                })
                .optional(),
              middleName: z
                .string({ required_error: 'Middle name is required.' })
                .optional(),
              lastName: z
                .string({ required_error: 'Last name is required.' })
                .regex(/^[A-Za-z]+$/, {
                  message: 'Last name must contain only alphabets.',
                })
                .optional(),
            })
            .optional(),
          gender: z.enum(['Male', 'Female'], {
            required_error: 'Gender is required.',
          }).optional(),
          bloodGroup: z.enum(
            ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            {
              required_error: 'Blood group is required.',
            }
          ).optional(),
          dateOfBirth: z
            .string({ required_error: 'Date of birth is required.' })
            .optional(),
          email: z
            .string({ required_error: 'Email is required.' })
            .email({ message: 'Email must be a valid email address.' })
            .optional(),
          contactNumber: z
            .string({ required_error: 'Contact number is required.' })
            .optional(),
          avatar: z
            .string({ required_error: 'Avatar is required.' })
            .optional(),
          emergencyContactNumber: z
            .string({
              required_error: 'Emergency contact number is required.',
            })
            .optional(),
          guardian: z
            .object({
              fatherName: z
                .string({ required_error: "Father's name is required." })
                .optional(),
              motherName: z
                .string({ required_error: "Mother's name is required." })
                .optional(),
              fatherOccupation: z
                .string({
                  required_error: "Father's occupation is required.",
                })
                .optional(),
              motherOccupation: z
                .string({
                  required_error: "Mother's occupation is required.",
                })
                .optional(),
              fatherContactNumber: z
                .string({
                  required_error: "Father's contact number is required.",
                })
                .optional(),
              motherContactNumber: z
                .string({
                  required_error: "Mother's contact number is required.",
                })
                .optional(),
            })
            .optional(),
          localeGuardian: LocaleGuardianValidationSchema.optional(), // Updated here
          permanentAddress: z
            .string({
              required_error: 'Permanent address is required.',
            })
            .optional(),
          presentAddress: z
            .string({
              required_error: 'Present address is required.',
            })
            .optional(),
          profileImage: z.string().optional(),
          admissionSemester: z.string().optional(),
          academicDepertment: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

export default StudentValidationUpdateSchemaForZod
