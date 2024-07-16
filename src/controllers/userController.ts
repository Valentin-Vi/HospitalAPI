import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email
        }
        return res.status(200).json(await prisma.users.create({data:user}));
    } catch(e) {
        console.log("Error creating user...");
    }
    return res.status(500).send('Internal server error/');
};


const readAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await prisma.users.findMany();
        if(users) {
            return res.status(200).json(users);
        } else {
            return res.status(404).send("Users table may be empty.");
        }
    } catch(e) {
        console.log("Error reading all users...");
    }
    return res.status(500).send("Internal server error.");
}

const readUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.users.findFirst({
            where: {
                user_id: id
            }
        });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).send(`User with user_id=${id} was not`)
        }
    } catch(e) {
        console.log("Error reading user...");
    }
    return res.status(500).send("Internal server error.");
};

// export const readAllUsers = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const result: QueryResult = await pool.query('SELECT * FROM users;');
//         res.status(200).json(result.rows);
//     } catch(e) {
//         console.log(e);
//     }
//     return res.status(500).json("Internal server error"); 
// }
// export const readUserById = async (req: Request, res: Response): Promise<Response> => {
    
// }
// export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    
// }
// export const deleteUser = async (req: Request, res: Response): Promise<Response> => {

// }

module.exports = {
    createUser,
    readUserById,
    readAllUsers
}