import mongoose from "mongoose";
import Session from "../models/session.model";

export async function getSessionById(sessionId: string) {
    const session = await Session.findById(sessionId);

    return session && session.valid ? session : null;
}

export async function createSession(userId: mongoose.Types.ObjectId, email: string) {
    return await Session.create({userId, email});
}

export async function invalidateSession(sessionId: string) {
    return Session.findByIdAndUpdate(sessionId, {valid : false}, {
        new : true,
        runValidators : true
    });
}