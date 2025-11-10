import type { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { invalidateSession } from "../services/session.service";

export async function registerHandler(req: Request, res: Response) {
    const {accessToken, refreshToken, session, newUser} = await registerUser(req.validatedBody);

    res.cookie("accessToken", accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })

    res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({
        message: "Registration successful",
        user: newUser.id,
        session: {
            userId: session.userId,
            email: session.email
        }
    });
}

export async function loginHandler(req: Request, res: Response) {
    const {accessToken, refreshToken, session} = await authenticateUser(req.validatedBody);

    res.cookie("accessToken", accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })

    res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })

    res.status(StatusCodes.OK).json({
        userId: session.userId,
        email: session.email
    })
}

export async function logoutHandler(req: Request, res: Response) {
    res.cookie("accessToken", "", {maxAge: 0, httpOnly: true})
    res.cookie("refreshToken", "", {maxAge: 0, httpOnly: true})

    const session = await invalidateSession(req.user.sessionId)
2
    res.status(StatusCodes.OK).json({
        message: "Logout successful",
        data: session
    })
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({
        userId: req.user.userId,
        email: req.user.email,
    })
}
