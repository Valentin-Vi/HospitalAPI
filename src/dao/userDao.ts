import { hash } from "crypto";
import { User } from "../model/userModel";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (
    email: string,
    hashedPassword: string,
    name: string,
    lastname: string,
    authority: number
): Promise<User | null> => {
    try {
        console.log(`Attempting insertion to 'user' table row...`);
        const createdUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                lastname: lastname,
                authority: authority
            },
        });
        return new User(createdUser.user_id, createdUser.email, undefined, createdUser.name, createdUser.lastname, createdUser.authority);
    } catch (e) {
        console.log(
            `Built-in exception at userDao.createUser. Provided parameters name=${name}, email=${email}.\nException message:` +
                e
        );
        return null;
    }
};

export const readAllUsers = async (): Promise<User[] | null> => {
    try {
        console.log(`Attempting read all of 'user' table...`);
        const users = await prisma.user.findMany();
        return users.map(
            (user) => new User(user.user_id, user.email, user.password, user.name, user.lastname, user.authority)
        );
    } catch (e) {
        console.log(
            `Built-in exception at userDao.readAllUser.\nException message: ` +
                e
        );
        return null;
    }
};

export const readUserById = async (user_id: number): Promise<User | null> => {
    try {
        console.log(`Attempting read of 'user' table row...`);
        const foundUser = await prisma.user.findFirst({
            where: {
                user_id: user_id,
            },
        });
        if (foundUser !== null) {
            return new User(foundUser.user_id, foundUser.email, foundUser.password, foundUser.name, foundUser.lastname, foundUser.authority);
        }
    } catch (e) {
        console.log(
            `Built-in exception at userDao.readUserById. Provided parameters user_id=${user_id}.\nException message:` +
                e
        );
    }
    return null;
};

export const readUserByEmail = async (email: string): Promise<User | null> => {
    try {
        console.log(`Attempting read of 'user' table row...`);
        const foundUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (foundUser !== null) {
            return new User(foundUser.user_id, foundUser.email, foundUser.password, foundUser.name, foundUser.lastname, foundUser.authority);
        }
    } catch (e) {
        console.log(
            `Built-in exception at userDao.readUserByName. Provided parameters name=${name}.\nException message:` +
                e
        );
    }
    return null;
};

export const updateUser = async (user: User): Promise<User | null> => {
    try {
        console.log(`Attempting update of 'user' table row...`);
        const updatedUser = await prisma.user.update({
            where: {
                user_id: user.getUser_id(),
            },
            data: {
                name: user.getName(),
                email: user.getEmail(),
            },
        });
        if (updateUser !== null) {
            return new User(
                updatedUser.user_id,
                updatedUser.email,
                updatedUser.password,
                updatedUser.name,
                updatedUser.lastname,
                updatedUser.authority
            );
        }
    } catch (e) {
        console.log(
            `Built-in exception at userDao.updateUser. Provided parameters user_id=${user.getUser_id()}, name=${user.getName()}, email=${user.getEmail()}.\nException message:` +
                e
        );
    }
    return null;
};

export const deleteUser = async (user_id: number): Promise<User | null> => {
    try {
        console.log(`Attempting deletion of 'user' table row...`);
        const user = await prisma.user.delete({
            where: {
                user_id: user_id,
            },
        });
        if (user) {
            return new User(user.user_id, user.email, user.password, user.name, user.lastname, user.authority);
        }
    } catch (e) {
        console.log(
            `Built-in exception at userDao.deleteUser. Provided parameter user_id=${user_id}.\nException message:` +
                e
        );
    }
    return null;
};
