import User from "../models/user.model";

async function getUserByID(id: string) {
    const user = await User.findById(id);
    if (!user)
        throw new Error(`User with ID "${id}" was not found.`);

    return user;
}

export async function getUser(id: string) {
    return await getUserByID(id);
}

export async function updateUser(id: string, userData: any) {
    console.log("User:", id);
    const user = await getUserByID(id);

    try {
        user.set(userData);
        return await user.save();
    } catch (err: any) {
        throw new Error("Failed to update user.");
    }
}
