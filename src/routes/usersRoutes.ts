import { Router } from "express";
const router = Router();

const userController = require("../controllers/userController");

router.post('/', userController.createUser);
router.get('/view', userController.readAllUsers);
router.get('/:id', userController.readUserById);
// usersRouter.put('/users/:id', getUser)
// usersRouter.delete('/users/:id', getUser)

export default router;