import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/errors.utils";

export function requireUser(req:Request, res:Response, next:NextFunction){
    if (!req.user)
        throw new Unauthorized("User not authorized")

    return next();
}