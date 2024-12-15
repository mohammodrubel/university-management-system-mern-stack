import { z } from "zod";

export const offerCourseSchemaValidation = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        // academicSemester: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]),
        startTime: z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, {
            message: 'Invalid time format. Expected HH:mm format. Example: 09:00 or 23:59.'
        }),
        endTime: z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
        }, {
            message: 'Invalid time format. Expected HH:mm format. Example: 09:00 or 23:59.'
        }),
    }).refine((body)=>{
        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    },{
        message:'start time should be before end time'
    })
});

export const offerCourseUpdateSchemaValidation = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        section: z.number().optional(),
        days: z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]).optional(),
        startTime: z.string().optional().refine((time)=>{
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
            // return regex.test(time)
        }),
        endTime: z.string().optional().refine((time)=>{
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
            // return regex.test(time)
        }),
    })
});
