import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User, { UserType } from "../models/user.model";
import { Conflict, Unauthorized } from "../utils/errors.utils";
import { createSession } from "./session.services";
import { signJWT } from "../utils/jwt.utils";
import { LoginSchemaType } from "../schemas/auth.schema";
import { CreateUserSchemaType } from "../schemas/user.schema";

async function createNewSession(userId: mongoose.Types.ObjectId, email: string) {
    const session = await createSession(userId, email);

    const accessToken = signJWT({
        userId : userId.toString(),
        email : email,
        sessionId : session._id.toString()
    }, "5m");

    const refreshToken = signJWT({
        sessionId : session._id.toString()
    }, "30d");

    return {accessToken, refreshToken, session};
}

export async function createNewUser(userData: CreateUserSchemaType) {
    const {email, password} = userData;

    if (await User.findOne({email}))
        throw new Conflict("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({email, password : hashedPassword});

    const session = await createNewSession(newUser._id, newUser.email);
    return {...session, newUser};
}

export async function loginUser(userLogin: LoginSchemaType) {
    const {email, password} = userLogin;

    const user: UserType = await User.findOne({email}).select("+password");

    if (!user)
        throw new Unauthorized("Login failed. Invalid email or password.");
    if (!await bcrypt.compare(password, user.password))
        throw new Unauthorized("Login failed. Invalid email or password.");

    return await createNewSession(user._id, user.email);
}