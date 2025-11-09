import express from 'express';
import {
    updateMyDetails,
    getMyDetails
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getMyDetails);
router.put("/", updateMyDetails);

export default router;