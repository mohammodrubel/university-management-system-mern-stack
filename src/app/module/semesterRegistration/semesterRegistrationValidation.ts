import { z } from "zod";

const semesterRegistrationZodValidation = z.object({
    body:z.object({
        academicSemester: z.string(),
          status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).default("UPCOMING"),
          startDate: z.string().datetime(),
          endDate: z.string().datetime(),
          maxCredit: z.number({ required_error: "maxCredit is required" }).max(15),
          minCredit: z.number({ required_error: "minCredit is required" }).min(3).default(3),
    })
})

export const semesterRegistrationValidation = semesterRegistrationZodValidation