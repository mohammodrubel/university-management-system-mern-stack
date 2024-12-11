import { z } from "zod";

export const preRequisiteCourseSchema = z.object({
    course: z.string().optional(), // Assuming `course` is an ObjectId or string
    isDeleted: z.boolean().optional(), // Optional with default behavior handled in Mongoose
});

export const courseSchemaValidation = z.object({
    body: z.object({
        title: z.string().min(1, { message: "Title is required" }),
        prefix: z.string().min(1, { message: "Prefix is required" }).trim(),
        code: z.number().positive({ message: "Code must be a positive number" }),
        credits: z.number().positive({ message: "Credits must be a positive number" }),
        preRequisiteCourse: z.array(preRequisiteCourseSchema).optional().default([]),
        isDeleted:z.boolean().default(false)
    })
});
export const updatepreRequisiteCourseSchema = z.object({
    course: z.string().optional(), // Assuming `course` is an ObjectId or string
    isDeleted: z.boolean().optional(), // Optional with default behavior handled in Mongoose
});

export const courseUpdateSchemaValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().trim().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourse: z.array(updatepreRequisiteCourseSchema).optional().default([]),
        isDeleted:z.boolean().default(false).optional()
    })
});

export const courseFacultyValidation = z.object({
    body:z.object({
        faculties:z.array(z.string())
    })
})