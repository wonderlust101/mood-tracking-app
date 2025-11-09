import express from 'express';
import {
    updateMyDetails,
    getMyDetails
} from "../controllers/user.controller";

const router = express.Router();

router.put("/", updateMyDetails);
router.get("/", getMyDetails);

export default router;