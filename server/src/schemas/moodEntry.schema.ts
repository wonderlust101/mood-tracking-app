import { z } from "zod";

export const moodEntrySchema = z.object({
    mood : z.number("Mood must be a number between -2 and 2.")
        .min(-2, "Mood cannot less than -2.")
        .max(2, "Mood cannot be greater than 2."),

    feelings : z.array(z.string("Each feeling must be a string.")
        .min(1, "Feeling cannot be empty.")
    ).nonempty("Please select at least one feeling."),

    journalEntry : z.string("Journal entry must be a string.")
        .min(1, "Please include a short journal entry."),

    sleepHours : z.number("Sleep hours must be a number.")
        .min(0, "Sleep hours cannot be negative.")
        .max(24, "Sleep hours must be less than or equal to 24.")
});

export type MoodEntrySchemaType = z.infer<typeof moodEntrySchema>;
