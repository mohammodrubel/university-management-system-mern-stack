import { z } from "zod";

const LocaleGuardianValidationSchema = z.object({
    name: z.string({ required_error: 'Local guardian name is required.' }),
    occupation: z.string({ required_error: 'Local guardian occupation is required.' }),
    middleName: z.string({ required_error: 'Local guardian middle name is required.' }),
    lastName: z.string({ required_error: 'Local guardian last name is required.' }),
  });
  
  const StudentValidationSchemaForZod = z.object({
    id: z.string({ required_error: 'ID is required.' }),
    name: z.object({
      firstName: z.string()
        .min(5, { message: 'First name must be at least 5 characters long.' })
        .max(20, { message: 'First name cannot exceed 20 characters.' }),
      middleName: z.string({ required_error: 'Middle name is required.' }),
      lastName: z.string({ required_error: 'Last name is required.' })
        .regex(/^[A-Za-z]+$/, { message: 'Last name must contain only alphabets.' }),
    }),
    password:z.string(),
    isDeleted:z.boolean(),
    gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required.' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { required_error: 'Blood group is required.' }),
    dateOfBirth: z.string({ required_error: 'Date of birth is required.' }),
    email: z.string({ required_error: 'Email is required.' })
      .email({ message: 'Email must be a valid email address.' }),
    contactNumber: z.string({ required_error: 'Contact number is required.' }),
    avatar: z.string({ required_error: 'Avatar is required.' }),
    emergencyContactNumber: z.string({ required_error: 'Emergency contact number is required.' }),
    guardian: z.object({
      fatherName: z.string({ required_error: "Father's name is required." }),
      motherName: z.string({ required_error: "Mother's name is required." }),
      fatherOccupation: z.string({ required_error: "Father's occupation is required." }),
      motherOccupation: z.string({ required_error: "Mother's occupation is required." }),
      fatherContactNumber: z.string({ required_error: "Father's contact number is required." }),
      motherContactNumber: z.string({ required_error: "Mother's contact number is required." }),
    }),
    isActive: z.enum(['Active', 'inActive'], { required_error: 'Active status is required.' }).default('Active'),
    localeGuardian: LocaleGuardianValidationSchema, // Updated here
    permanentAddress: z.string({ required_error: 'Permanent address is required.' }),
    presentAddress: z.string({ required_error: 'Present address is required.' }),
    profileImage: z.string().optional(),
  });
  
  export default StudentValidationSchemaForZod