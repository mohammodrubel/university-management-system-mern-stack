import { z } from 'zod'

const NameSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    middleName: z.string().optional(),
})

const TadminSchemaVaidation = z.object({
   body:z.object({
    password: z.string().optional(),
    admin: z.object({
        id: z.string().optional(),
        name: NameSchema,
        gender: z.enum(['Male', 'Female']),
        email: z.string().email('Invalid email address'),
        avatar: z.string().url('Invalid avatar URL').optional(),
        dateOfBirth: z.string(),
        contactNumber: z
            .string()
            .min(10, 'Contact number must be at least 10 digits'),
        emergencyContactNumber: z
            .string()
            .min(10, 'Emergency contact number must be at least 10 digits'),
        bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        presentAddress: z.string().min(1, 'Present address is required'),
        permanentAddress: z.string().min(1, 'Permanent address is required'),
        profileImage: z.string().optional(),
        isDeleted: z.boolean(),
        // user: z.string(),
    }),
   })
})

export default TadminSchemaVaidation
