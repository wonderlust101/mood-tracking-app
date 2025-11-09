import express from 'express';
import {
    updateMyDetails,
    getMyDetails
} from "../controllers/user.controller";
import { zodValidation } from "../middlewares/schema-validation";
import { updateUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.get("/", getMyDetails);
router.put("/", zodValidation({body : updateUserSchema}),updateMyDetails);

export default router;