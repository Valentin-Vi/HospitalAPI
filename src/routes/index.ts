import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/index.controller";

router.post('/users', createUser)
// router.post('/users', getUser)
// router.put('/users/:id', getUser)
// router.delete('/users/:id', getUser)


export default router;