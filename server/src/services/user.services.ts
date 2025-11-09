import User from "../models/user.model";
import { NotFound } from "../utils/errors.utils";

export async function findUserByID(id: string) {
    const user = await User.findById(id);
    if (!user)
        throw new NotFound(`User with ID "${id}" was not found.`);

    return user;
}

export async function updateUser(id: string, userData: any) {
    console.log("User:", id);
    const user = await findUserByID(id);

    try {
        user.set(userData);
        return await user.save();
    } catch (err: any) {
        throw new Error("Failed to update user.");
    }
}
