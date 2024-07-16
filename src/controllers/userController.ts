import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// CREATE
const createUser = async (req: Request, res: Response): Promise<Response> => {
    console.log(`Attempting insertion to 'users' table row...`);
    const { name, email } = req.body;
    try {
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email
            }
        });
        if (user) {
            console.log(`User with user_id=${user.user_id} created succesfully.`);
            return res.status(200)
                    .json(user);
        } else {
            console.log(`User not created.`);
            return res.status(404)
                    .send(`User not created.`)
        }
        
    } catch(e) {
        console.log(`Built-in exception at userController.createUser. Provided parameters name=${name}, email=${email}.\nException message:` + e);
    }
    return res.status(500).send('Internal server error/');
};

// READ ALL
const readAllUsers = async (req: Request, res: Response): Promise<Response> => {
    console.log(`Attempting read all of 'users' table...`);
    try {
        const users = await prisma.users.findMany();
        if(users) {
            return res.status(200)
                    .json(users);
        } else {
            return res.status(404)
                    .send("Users table may be empty.");
        }
    } catch(e) {
        console.log(`Built-in exception at userController.readAllUsers.\nException message:` + e);
    }
    return res.status(500)
            .send("Internal server error.");
}

// READ
const readUserById = async (req: Request, res: Response): Promise<Response> => {
    console.log(`Attempting read of 'users' table row...`);
    const user_id = parseInt(req.params.id);
    try {
        const user = await prisma.users.findFirst({
            where: {
                user_id: user_id
            }
        });
        if (user) {
            console.log(`User with user_id=${user_id} read succesfully.`);
            return res.status(200)
                    .json(user);
        } else {
            console.log(`User with user_id=${user_id} not found.`);
            return res.status(404)
                    .send(`User with user_id=${user_id} not found.`)
        }
    } catch(e) {
        console.log(`Built-in exception at userController.readUserById. Provided parameters user_id=${user_id}.\nException message:` + e);
    }
    return res.status(500).send("Internal server error.");
};

// UPDATE // Need to handle state change logic somewhere on front-end
const updateUser = async (req: Request, res: Response): Promise<Response> => {
    console.log(`Attempting update of 'users' table row...`);
    const user_id = parseInt(req.params.id);
    const { name, email } = req.body;
    
    try {
        const user = await prisma.users.update({
            where: {
                user_id: user_id
            },
            data: {
                name: name,
                email: email
            }
        });
        if(user) {
            console.log(`User with user_id=${user_id} updated succesfully.`);
            return res.status(200)
                    .json(user);
        } else {
            console.log(`User with user_id=${user_id} not found.`);
            return res.status(404)
                    .send(`User with user_id=${user_id} not found.`);
        }
    } catch (e) {
        console.log(`Built-in exception at userController.updateUser. Provided parameters user_id=${user_id}, name=${name}, email=${email}.\nException message:` + e);
    }
    return res.status(500)
            .send('Internal server error.');
}

// DELETE
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    console.log(`Attempting deletion of 'users' table row...`);
    const user_id = parseInt(req.params.id);
    try {
        const user = await prisma.users.delete({
            where: {
                user_id: user_id
            }
        });
        if (user) {
            console.log(`User of user_id=${user_id} deleted succesfully.`);
            return res.status(200)
                    .json(user);
        } else {
            console.log(`User of user_id=${user_id} not found.`);
            return res.status(404)
                    .send(`User with user_id=${user_id} not found.`);
        }
    } catch (e) {
        console.log(`Built-in exception at userController.deleteUser. Provided parameter user_id=${user_id}.\nException message:` + e);
    }
    return res.status(500)
            .send('Internal server error.' + user_id);
}
module.exports = {
    createUser,
    readUserById,
    readAllUsers,
    updateUser,
    deleteUser
}