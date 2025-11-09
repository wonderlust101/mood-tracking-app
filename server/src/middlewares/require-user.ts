import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from "../utils/errors.utils";

export function requireUser(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        throw new Unauthorized("Unauthorized. Sign in to access this resource.");
    }

    return next();
}