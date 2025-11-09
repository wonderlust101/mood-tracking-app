import { Request, Response } from "express";
import { findUserByID, updateUser } from "../services/user.services";
import { StatusCodes } from "http-status-codes";

export async function getMyDetails(req: Request, res: Response) {
    const user = await findUserByID(req.user.userId);
    res.status(StatusCodes.OK).json(user);
}

export async function updateMyDetails(req: Request, res: Response) {
    const updatedUser = await updateUser(req.user.userId, req.validatedBody);
    res.status(StatusCodes.OK).json(updatedUser);
}