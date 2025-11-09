import mongoose, { Document } from 'mongoose';

export type UserType = Document & {
    _id: mongoose.Types.ObjectId;
    name: string;
    profileImage: string;
    email: string;
    password: string;
}

const User = new mongoose.Schema<UserType>(
    {
        name : {
            type : String,
            default : ""
        },
        profileImage : {
            type : String,
            default : ""
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

export default mongoose.model<UserType>("User", User);