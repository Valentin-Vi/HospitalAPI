import { Router } from "express";
const router = Router();

const { registration, deletion, login, readAll, readById } = require("../controllers/userController");

router.post('/registration', registration);
router.post('/deletion', deletion);
router.post('/login', login);

router.get('/readAll', readAll);
router.post('/readById', readById);

export default router;