import jwt from 'jsonwebtoken';

export function signJWT(payload: Record<string, any>, expiresIn: string | number | undefined) {
    if (!process.env.JWT_ACCESS_SECRET)
        throw new Error("JWT_ACCESS_SECRET is not defined");

    const options: any = {
        algorithm : "HS256",
        expiresIn
    };

    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
}

export function verifyJWT(token: string) {
    if (!process.env.JWT_ACCESS_SECRET)
        throw new Error("JWT_ACCESS_SECRET is not defined");

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return {payload : decoded, expired : false};
    } catch (error: any) {
        return {payload : null, expired : error?.message?.includes("jwt expired")};
    }
}