import { z } from 'zod';

export const registerSchema = z.object({
    email : z.email().min(1, "Email is required."),
    password : z.string().min(1, "Password is required.")
});

export const loginSchema = z.object({
    email : z.email().min(1, "Email is required."),
    password : z.string().min(1, "Password is required.")
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;