import mongoose, { Document, Schema } from "mongoose";

export type MoodEntryType = Document & {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    mood: number;
    feelings: string[];
    journalEntry: string;
    sleepHours: number;
    createdAt: Date;
}

const MoodEntry = new mongoose.Schema<MoodEntryType>({
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        mood : {
            type : Number,
            required : true
        },
        feelings : {
            type : [String],
            required : true
        },
        journalEntry : {
            type : String,
            required : true
        },
        sleepHours : {
            type : Number,
            required : true
        },
        createdAt : {
            type : Date,
            default : Date.now
        }
    },
    {
        timestamps : true
    });

export default mongoose.model<MoodEntryType>("MoodEntry", MoodEntry);