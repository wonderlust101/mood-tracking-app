import type { Request, Response } from "express";
import {StatusCodes} from "http-status-codes";

export async function getAllMoodEntries(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "All mood entries"});
}