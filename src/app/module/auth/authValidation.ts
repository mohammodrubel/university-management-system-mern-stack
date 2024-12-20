import { string, z } from "zod";

const loginValidation = z.object({
    body:z.object({
        id:string({required_error:'id is required for login'}),
        password:string({required_error:'password is required'})
    })
})

export default loginValidation