import { Router } from "express";
const router = Router();

const { registration, deletion, authentication} = require("../controllers/userController");

router.post('/registration', registration);
router.post('/deletion', deletion);
router.get('/authentincate', authentication);


export default router;