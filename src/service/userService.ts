import { User } from "../model/userModel";
import { createUser, deleteUser, readUserByEmail } from "../dao/userDao";

export const registerUser = async (
    email: string,
    hashedPassword: string,
    name: string,
    lastname: string,
    authority: number
): Promise<User | null> => {
    return createUser(email, hashedPassword, name, lastname, authority);
};

export const eraseUser = async (
    user_id: number
): Promise<User | null> => {
    return deleteUser(user_id);
};

export const authenticateUser = async (
    email: string,
    hashedPassword: string
): Promise<User | null> => {
    // Find user
    const user = await readUserByEmail(email);
    // Validate user exists
    if(!user) {
        return null;
    }
    // Validate password
    if(user.getPassword() === hashedPassword) {
        return user;
    }
    // Return status code
    return null;
};