import type { Request, Response } from "express";
import {createNewUser} from "../services/auth.services";
import { StatusCodes } from "http-status-codes";

export async function register(req: Request, res: Response) {
    const newUser = await createNewUser(req.body)

    res.status(201).json(newUser);
}

export async function login(req: Request, res: Response) {
    res.status(201).json({ message: "User logged in"});
}

export async function logout(req: Request, res: Response) {
    res.status(201).json({ message: "User logged out"});
}

export async function me(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({
        message: "User data",
    })
}
