import { string, z } from "zod";

const updateacademicDepertmentValidation = z.object({
    body:z.object({
        name:z.string({required_error:'Academic Depertment Name is required'}).optional(),
        academicFaculty:string({required_error:'academic Faculty Id is required'}).optional()
    })
})

export default updateacademicDepertmentValidation