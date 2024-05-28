import { z } from "zod"
 
export const signUpSchema = z.object({
  fullname: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
})

export const signInSchema = z.object({
  username: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})