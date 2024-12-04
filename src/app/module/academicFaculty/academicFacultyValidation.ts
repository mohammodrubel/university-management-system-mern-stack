import { z } from "zod";

const academicFacultyValidation = z.object({
    body:z.object({
        name:z.string({required_error:'Faculty Name is required'})
    })
})

export default academicFacultyValidation