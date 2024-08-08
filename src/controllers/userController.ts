import { Request, Response } from "express";
import { eraseUser, registerUser, authenticateUser } from "../service/userService";
const bcrypt = require("bcrypt");

// CREATE
export const registration = async (
    req: Request,
    res: Response
): Promise<Response> => {
    // Validate inputs
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;
    if (name === undefined || name === "" || email === undefined || email === "") {
        return res
            .status(400)
            .send("Invalid inputs for fields name and/or email.");
    }

    // Make service call and wait for promise to ressolve to type User.
    const user = await registerUser(email, password, name, lastname, 0);
    if(user) {
        return res
            .status(500)
            .send(`Error creting user...`);
    }
    return res
        .status(201)
        .json(user);
};

export const deletion = async (
    req: Request,
    res: Response
): Promise<Response> => {
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

export const authentication = async(
    req: Request,
    res: Response
): Promise<Response> => {
    const email = req.body.email;
    const password = req.body.password;
    if(email === undefined || password === undefined) {
        return res
            .status(400)
            .send("Invalid inputs for fields email and/or password.");
    }
    // Hash password and make service call
    const user = await authenticateUser(email, await bcrypt.hash(password, 10));
    // Validate response
    if(!user) {
        return res
            .status(404)
            .send("Email and/or password are incorrect.");
    }
    // Send response object
    return res
        .status(200)
        .json(user);
};