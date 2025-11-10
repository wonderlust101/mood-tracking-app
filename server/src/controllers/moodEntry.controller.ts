import type { Request, Response } from "express";
import {
    createMoodEntry,
    getMoodEntryByIdAndUser,
    getMoodEntriesByUser
} from "../services/moodEntry.service";
import {StatusCodes} from "http-status-codes";

export async function getAllMoodEntriesHandler(req: Request, res: Response) {
    const moodEntries = await getMoodEntriesByUser(req.user.userId);
    res.status(StatusCodes.OK).json(moodEntries);
}

export async function getMoodEntryByIdHandler(req: Request, res: Response) {
    const moodEntry = await getMoodEntryByIdAndUser(req.user.userId, req.validatedParams.id);
    res.status(StatusCodes.OK).json(moodEntry);
}

export async function createMoodEntryHandler(req: Request, res: Response) {
    const moodEntry = await createMoodEntry(req.user.userId, req.validatedBody);
    res.status(StatusCodes.CREATED).json(moodEntry);
}