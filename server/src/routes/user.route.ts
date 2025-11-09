import express from 'express';
import {
    updateMyDetails,
    getMyDetails
} from "../controllers/user.controller";
import { zodValidation } from "../middlewares/schema-validation";
import { UpdateUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.get("/", getMyDetails);
router.put("/", zodValidation({body : UpdateUserSchema}),updateMyDetails);

export default router;