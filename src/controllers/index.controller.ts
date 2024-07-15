import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body
    try {
        const user = {
            name: name,
            email: email
        }
        return res.status(200).json(await prisma.users.create({data:user}));
    } catch(e) {
        console.log("Error creating user...");
    }
    return res.status(500).send('Internal server error');
}

export const readUser = async (req: Request, res: Response): Promise<Response> => {
    prisma.users.findFirst
}

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