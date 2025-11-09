import { z } from "zod";

export const updateUserSchema = z.object({
    name : z.string("Name must be a valid string.")
        .min(1, {message : "Name cannot be empty."})
        .optional(),

    profileImage : z.string("Profile image URL must be a valid string.")
        .optional()
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
