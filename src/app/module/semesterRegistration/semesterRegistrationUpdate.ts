import { z } from "zod";

const semesterRegistrationUpdateZodValidation = z.object({
    body:z.object({
        academicSemester: z.string().optional(),
          status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).default("UPCOMING").optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          maxCredit: z.number({ required_error: "maxCredit is required" }).max(15).optional(),
          minCredit: z.number({ required_error: "minCredit is required" }).min(3).default(3).optional(),
    })
})

export default   semesterRegistrationUpdateZodValidation