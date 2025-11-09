import MoodEntry, { type MoodEntryType } from "../models/moodEntry.model";
import { NotFound, Unauthorized } from "../utils/errors.utils";

export async function getMoodEntries(userId: string) {
    const filter: Record<string, any> = {};

    if (userId)
        filter.userId = userId;

    return await MoodEntry.find(filter).sort({createdAt : -1}).lean().exec();
}

export async function findMoodEntryByID(userId: string, id: string) {
    const moodEntry = await MoodEntry.findById(id).lean().exec();

    if (!moodEntry)
        throw new NotFound("Mood entry not found");

    if (moodEntry.userId.toString() !== userId)
        throw new Unauthorized("You do not have permission to access this mood entry")

    return moodEntry;
}

export async function createNewMoodEntry(userId: string, moodEntry: MoodEntryType) {
    return await MoodEntry.create({...moodEntry, userId});
}