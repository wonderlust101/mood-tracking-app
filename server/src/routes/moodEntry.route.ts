import express from 'express';
import {
    getAllMoodEntries,
    getMoodEntry,
    createMoodEntry
} from "../controllers/moodEntry.controller";
import { zodValidation } from "../middlewares/schema-validation";
import { moodEntrySchema } from "../schemas/moodEntry.schema";
import { ObjectIdSchema } from "../schemas/params.schema";

const router = express.Router();

router.route("/")
        .get(getAllMoodEntries)
        .post(zodValidation({body: moodEntrySchema}), createMoodEntry);

router.route("/:id")
        .get(zodValidation({params: ObjectIdSchema}), getMoodEntry);

export default router;