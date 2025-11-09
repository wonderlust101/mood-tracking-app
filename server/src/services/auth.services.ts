import User from "../models/user.model";

export async function createNewUser(userData:any) {
    const {email} = userData;

    if (await User.findOne({email}))
        throw new Error("User already exists");

    return await User.create(userData);
}