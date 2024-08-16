import { User } from "../model/userModel";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (
    email: string,
    hashedPassword: string,
    name: string,
    lastname: string,
    authority: number
): Promise<User | null> => {
    try {
        const createdUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                lastname: lastname,
                authority: authority
            },
        });
        return new User(
            createdUser.user_id,
            createdUser.email,
            undefined,
            createdUser.name,
            createdUser.lastname,
            createdUser.authority);
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const readAll = async (): Promise<User[] | null> => {
    try {
        const users = await prisma.user.findMany();
        return users.map(
            (user) => new User(
                user.user_id,
                user.email,
                user.password,
                user.name,
                user.lastname,
                user.authority)
        );
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const readById = async (user_id: number): Promise<User | null> => {
    try {
        const readUser = await prisma.user.findFirst({
            where: {
                user_id: user_id,
            },
        });
        if (readUser !== null) {
            return new User(
                readUser.user_id,
                readUser.email,
                readUser.password,
                readUser.name,
                readUser.lastname,
                readUser.authority);
        }
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const readByEmail = async (email: string): Promise<User | null> => {
    try {
        const readUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (readUser !== null) {
            return new User(
                readUser.user_id,
                readUser.email,
                readUser.password,
                readUser.name,
                readUser.lastname,
                readUser.authority);
        }
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const update = async (user: User): Promise<User | null> => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                user_id: user.getUser_id(),
            },
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                name: user.getName(),
                lastname: user.getLastname(),
                authority: user.getAuthority(),
            },
        });
        if (updatedUser !== null) {
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
        console.log(e);
    }
    return null;
};

export const remove = async (user_id: number): Promise<User | null> => {
    try {
        const user = await prisma.user.delete({
            where: {
                user_id: user_id,
            },
        });
        if (user) {
            return new User(
                user.user_id,
                user.email,
                user.password,
                user.name,
                user.lastname,
                user.authority);
        }
    } catch (e) {
        console.log(e);
    }
    return null;
};
