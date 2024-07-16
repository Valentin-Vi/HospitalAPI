import { Router } from "express";
const router = Router();

const userController = require("../controllers/userController");

router.post('/create', userController.createUser);
router.get('/readAll', userController.readAllUsers);
router.get('/read/:id', userController.readUserById);
router.post('/update/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

export default router;