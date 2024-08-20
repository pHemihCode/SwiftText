import { z } from "zod"
 
export const signUpSchema = z.object({
  name: z.string().min(6, {
    message: "Please input your name",
  }),
  username: z.string().min(6, {
    message: "Username is required",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Input your password",
  }),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Input your password",
  }),
})

export const PostSchema = z.object({
  caption: z.string().min(5).max(200),
  file:z.custom<File[]>(),
  location:z.string().min(2).max(200),
  tags:z.string()
})