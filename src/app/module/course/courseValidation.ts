import { z } from "zod";

export const preRequisiteCourseSchema = z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

export const courseSchemaValidation = z.object({
    // body: z.object({
        title: z.string().min(1, "Title is required"),
        prefix: z.string().min(1, "Prefix is required"),
        code: z.number(),
        preRequisiteCourse: z.array(preRequisiteCourseSchema).optional(),
        cradits: z.number(),
    // })
});
