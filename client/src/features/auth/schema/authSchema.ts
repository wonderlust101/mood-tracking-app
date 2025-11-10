import {z} from "zod";

// TODO: Create better password validation
export const authSchema = z.object({
    email : z.email("Please enter a valid email address."),
    password : z.string().min(8, "Please enter a password at least 8 characters long.")
});

export type AuthFields = z.infer<typeof authSchema>;