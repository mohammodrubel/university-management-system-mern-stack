import { z } from 'zod';

const facultyValidationSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        faculty: z.object({
            academicDepartment: z.string().min(1, { message: 'Academic department is required.' }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            contactNo: z.string().min(1, { message: 'Contact number is required.' }),
            dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
            designation: z.string().min(1, { message: 'Designation is required.' }),
            email: z.string().email({ message: 'Invalid email address.' }),
            emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required.' }),
            gender: z.enum(['Male', 'Female']),
            profileImage: z.string().optional(),
            name: z.object({
                firstName: z.string().min(1, { message: 'First name is required.' }),
                middleName: z.string().min(1, { message: 'Middle name is required.' }),
                lastName: z.string().min(1, { message: 'Last name is required.' }),
            }),
            permanentAddress: z.string().min(1, { message: 'Permanent address is required.' }),
            presentAddress: z.string().min(1, { message: 'Present address is required.' }),
        })
    })
});

export default facultyValidationSchema;
