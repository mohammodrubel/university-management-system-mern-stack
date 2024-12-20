import { z } from "zod";

const refreshTokenValidationSchema = z.object({
  cookies :z.object({
    refreshToken:z.string({required_error:'refresh token is required'})
  }) 
})

export default refreshTokenValidationSchema