import express from 'express';
import {
    registerHandler,
    loginHandler,
    logoutHandler,
    getCurrentUserHandler
} from '../controllers/auth.controller';
import { zodValidation } from "../middlewares/schema-validation";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { requireUser } from "../middlewares/require-user";

const router = express.Router();

router.post("/register", zodValidation({body : registerSchema}), registerHandler);
router.post("/login", zodValidation({body : loginSchema}), loginHandler);
router.post("/logout", requireUser, logoutHandler);
router.get("/me", requireUser, getCurrentUserHandler);

export default router;