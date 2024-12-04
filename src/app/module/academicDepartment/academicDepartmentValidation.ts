import { string, z } from "zod";

const academicDepertmentValidation = z.object({
    body:z.object({
        name:z.string({required_error:'Academic Depertment Name is required'}),
        academicFaculty:string({required_error:'academic Faculty Id is required'})
    })
})

export default academicDepertmentValidation