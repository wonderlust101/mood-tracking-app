import { Request, Response } from "express";
import { getUserById, updateUserById } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export async function getCurrentUserHandler(req: Request, res: Response) {
    const user = await getUserById(req.user.userId);
    res.status(StatusCodes.OK).json(user);
}

export async function updateCurrentUserHandler(req: Request, res: Response) {
    const updatedUser = await updateUserById(req.user.userId, req.validatedBody);
    res.status(StatusCodes.OK).json(updatedUser);
}