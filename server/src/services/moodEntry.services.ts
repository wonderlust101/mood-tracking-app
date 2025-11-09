import MoodEntry, { type MoodEntryType } from "../models/moodEntry.model";

export async function getMoodEntries() {
    const filter: Record<string, any> = {};
    return await MoodEntry.find(filter).sort({createdAt : -1}).lean().exec();
}

export async function findMoodEntryByID(id: string) {
    const moodEntry = await MoodEntry.findById(id);

    if (!moodEntry)
        throw new Error("Mood entry not found");

    return moodEntry;
}

export async function createNewMoodEntry(moodEntry: MoodEntryType) {
    return await MoodEntry.create({...moodEntry});
}