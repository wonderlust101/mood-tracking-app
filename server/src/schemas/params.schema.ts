import { z } from "zod";
import mongoose from "mongoose";

export const ObjectIdSchema = z.object({
    id: z.custom<mongoose.Types.ObjectId>((val) => {
        return typeof val === "string" && mongoose.Types.ObjectId.isValid(val);
    }, {
        message: "Invalid ObjectId",
    }),
});


export type ObjectId = z.infer<typeof ObjectIdSchema>;