import { Request, Response } from "express";
import { eraseUser, registerUser, authenticateUser, readUserById, readAllUsers } from "../service/userService";

// CREATE
export const registration = async (req: Request, res: Response): Promise<Response> => {
    // Validate inputs
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;
    if (name === undefined || name === "" || email === undefined || email === "" || lastname === undefined || lastname === "") {
        return res
            .status(400)
            .send("Invalid inputs for fields name and/or email.");
    }

    // Make service call and wait for promise to ressolve to type User.
    const user = await registerUser(email, password, name, lastname, 0);
    if(!user) {
        return res
            .status(500)
            .send(`Error creting user...`);
    }
    return res
        .status(201)
        .json(user);
};

export const deletion = async (req: Request, res: Response): Promise<Response> => {
    const user_id = req.body.user_id;
    if (user_id === undefined) {
        // This line is assuming that the user_id body attribute is of numerical type and not a string.
        return res
            .status(400)
            .send("Invalid input for field user_id.");
    }
    const user = await eraseUser(user_id);
    if(user) {
        return res
            .status(404)
            .send(`User of user_id=${user_id} not found.`);
    }
    return res
        .status(201)
        .send(`Succesfully deleted user of user_id=${user_id}.`);
};

export const login = async(
    req: Request,
    res: Response
): Promise<Response> => {
    const { email, password } = req.body;
    if(email === undefined || email === null || password === undefined || password === null) {
        return res
            .status(400);
    }
    // Hash password and make service call
    const jwt = await authenticateUser(email, password);
    // Validate response
    if(!jwt) {
        return res
            .status(404);
    }
    // Send response object
    return res
        .status(200)
        .json(jwt);
};

export const readAll = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const users = await readAllUsers();
    if(users) {
        return res.status(200)
            .json(users);
    }
    return res.status(500);
}

export const readById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const user_id = req.body
    if(user_id === null || user_id === undefined) {
        return res.status(400);
    }
    const user = await readUserById(user_id);
    if(user) {
        return res.status(200)
            .json(user);
    }
    return res.status(500);
}