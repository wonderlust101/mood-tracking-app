import { Request, Response, NextFunction } from "express";
import { signJWT, verifyJWT } from "../utils/jwt.util";
import { getSessionById } from "../services/session.service";

export default async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const {accessToken, refreshToken} = req.cookies;

    // If an access token is present and valid, attach user data to the request
    const {payload : accessPayload} = accessToken ? verifyJWT(accessToken) : {payload : null};
    if (accessPayload) {
        req.user = accessPayload;
        return next();
    }

    // If no access token, use refresh token to generate a new access token
    if (!refreshToken) return next();

    const {payload : refreshPayload} = verifyJWT(refreshToken);
    if (!refreshPayload || typeof refreshPayload === "string" || !refreshPayload.sessionId) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return next();
    }

    // Lookup session in database
    const session = await getSessionById(refreshPayload.sessionId);
    if (!session || !session.valid) return next();

    // Generate a new access token from session info
    const newAccessToken = signJWT({
        sessionId : session._id.toString(),
        email : session.email,
        userId : session.userId.toString()
    }, "5m");

    res.cookie("accessToken", newAccessToken, {
        maxAge : 5 * 60 * 1000,
        httpOnly : true,
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production"
    });

    // Attach session data to request
    req.user = {
        sessionId : session._id.toString(),
        email : session.email,
        userId : session.userId.toString()
    };

    return next();
}