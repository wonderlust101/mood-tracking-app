import express from 'express';
import {
    getAllMoodEntries
} from "../controllers/moodEntry.controller"

const router = express.Router();

router.route("/").get(getAllMoodEntries);



export default router;