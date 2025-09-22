import { Router } from "express";
import { body } from "express-validator";
import { register } from "../../controllers/superadmin/superadmin.controller.js";

const router = Router();

router.post('/register' , [] , register)

export default router;