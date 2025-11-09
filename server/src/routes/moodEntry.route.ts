import express from 'express';
import {
    getAllMoodEntries,
    getMoodEntry,
    createMoodEntry
} from "../controllers/moodEntry.controller";

const router = express.Router();

router.route("/")
        .get(getAllMoodEntries)
        .post(createMoodEntry);

router.route("/:id")
        .get(getMoodEntry);

export default router;