import type { Request, Response } from "express";
import {
    createNewMoodEntry,
    findMoodEntryByID,
    getMoodEntries
} from "../services/moodEntry.services";
import {StatusCodes} from "http-status-codes";

export async function getAllMoodEntries(req: Request, res: Response) {
    const moodEntries = await getMoodEntries(req.user.userId);
    res.status(StatusCodes.OK).json(moodEntries);
}

export async function getMoodEntry(req: Request, res: Response) {
    const moodEntry = await findMoodEntryByID(req.user.userId, req.validatedParams.id);
    res.status(StatusCodes.OK).json(moodEntry);
}

export async function createMoodEntry(req: Request, res: Response) {
    const moodEntry = await createNewMoodEntry(req.user.userId, req.validatedBody);
    res.status(StatusCodes.CREATED).json(moodEntry);
}