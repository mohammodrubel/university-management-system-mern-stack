import { z } from "zod";

const userSchemaValidation = z.object({
    // id: z.string().optional(),
    password: z.string({
        invalid_type_error:'password must be string'
    })
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password cannot exceed 15 characters")
    .optional(),
    // needPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(['user', 'admin', 'student']),
    // isDeleted: z.boolean().default(false),
    // status: z.enum(['in-progress', 'blocked']).default('in-progress')
});


export default userSchemaValidation