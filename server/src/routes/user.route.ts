import express from 'express';
import {
    updateCurrentUserHandler,
    getCurrentUserHandler
} from "../controllers/user.controller";
import { zodValidation } from "../middlewares/schema-validation";
import { updateUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.get("/", getCurrentUserHandler);
router.put("/", zodValidation({body : updateUserSchema}),updateCurrentUserHandler);

export default router;