import mongoose, { Document, Schema } from 'mongoose';

export type SessionType = Document & {
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    email: string,
    valid: boolean,
    createdAt: Date,
    expiresAt: Date,
}

const Session = new mongoose.Schema<SessionType>({
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        email : {
            type : String,
            required : true
        },
        valid : {
            type : Boolean,
            default : true
        },
        createdAt : {
            type : Date,
            default : Date.now
        },
        expiresAt : {
            type : Date,
            default : () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    },
    {
        timestamps : true
    }
);

export default mongoose.model<SessionType>("Session", Session);