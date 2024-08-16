import { User } from "../model/userModel";
import { create, remove, readByEmail, readAll, readById, update } from "../dao/userDao";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    lastname: string,
    authority: number
): Promise<User | null> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return create(email, hashedPassword, name, lastname, authority);
};

export const eraseUser = async (
    user_id: number
): Promise<User | null> => {
    return remove(user_id);
};

export const authenticateUser = async (
    email: string,
    password: string
): Promise<string | null> => {
    // Find user
    const user = await readByEmail(email);

    // Validate user exists & password is correct. Create and return JWT token
    if(user) {
        const hashedPassword = user.getPassword();
        if (hashedPassword) {
            bcrypt.compare(hashedPassword, await bcrypt.hash(password, 10))
            const jwt_secret = process.env.JWT_SECRET;
            if(jwt_secret) {
                return jwt.sign({
                    user_id: user.getUser_id(),
                    password: hashedPassword,
                    email: user.getEmail(),
                    name: user.getName(),
                    lastname: user.getLastname(),
                    authority: user.getAuthority()
                }, jwt_secret);
            }
        }
    }
    return null;
};

export const readAllUsers = async (): Promise<User[] | null> => {
    return await readAll();
}

export const readUserById = async (user_id: number): Promise<User | null> => {
    return await readById(user_id);
}

export const updateUser = async(user: User): Promise<User | null> => {
    return await update(user);
}