import User from "../models/user.model";
import { NotFound } from "../utils/errors.utils";
import { UpdateUserSchemaType } from "../schemas/user.schema";

export async function findUserByID(userId: string) {
    const user = await User.findById(userId);
    if (!user)
        throw new NotFound(`User with ID "${userId}" was not found.`);

    return user;
}

export async function updateUser(userId: string, userData: UpdateUserSchemaType) {
    const user = await findUserByID(userId);

    console.log(user);

    try {
        user.set(userData);
        return await user.save();
    } catch (err: any) {
        throw new Error(`Failed to update user:  ${err.message}`);
    }
}
