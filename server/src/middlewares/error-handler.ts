import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "./errors";

export default function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        return res.status((err as any).statusCode || 500).json({
            error: err.name,
            message: err.message,
            ...(err as any).errors && { errors: (err as any).errors }
        });
    }

    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "InternalServerError",
        message: "Something went wrong. Please try again later.",
    });
};