import User from "../models/user.model";
import { Conflict } from "../utils/errors.utils";

export async function createNewUser(userData:any) {
    const {email} = userData;

    if (await User.findOne({email}))
        throw new Conflict("User already exists");

    return await User.create(userData);
}