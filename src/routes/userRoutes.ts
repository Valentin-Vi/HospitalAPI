import { Router } from "express";
const router = Router();

const { createUser, readAllUsers, readUserById, updateUser, deleteUser } = require("../controllers/userController");

router.post('/create', createUser);
router.get('/readAll', readAllUsers);
router.get('/read/:user_id', readUserById);
router.post('/update/:user_id', updateUser);
router.post('/delete/:user_id', deleteUser);

export default router;