import { z } from 'zod';

export const CreateUserSchema = z.object(
    {
        email: z.email().min(1, "Email is required."),
        password: z.string().min(1, "Password is required."),
    }
)

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
})

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
