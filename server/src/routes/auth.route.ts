import express from 'express';
import {
    register,
    login,
    logout,
    me
} from '../controllers/auth.controller';
import { zodValidation } from "../middlewares/schema-validation";
import { CreateUserSchema } from "../schemas/user.schema";
import { loginSchema } from "../schemas/auth.schema";
import { requireUser } from "../middlewares/require-user";

const router = express.Router();

router.post("/register", zodValidation({body : CreateUserSchema}), register);
router.post("/login", zodValidation({body : loginSchema}), login);
router.delete("/logout", requireUser, logout);
router.get("/me", requireUser, me);

export default router;