import express from 'express';
import {
    getAllMoodEntriesHandler,
    getMoodEntryByIdHandler,
    createMoodEntryHandler
} from "../controllers/moodEntry.controller";
import { zodValidation } from "../middlewares/schema-validation";
import { moodEntrySchema } from "../schemas/moodEntry.schema";
import { ObjectIdSchema } from "../schemas/params.schema";

const router = express.Router();

router.route("/")
        .get(getAllMoodEntriesHandler)
        .post(zodValidation({body: moodEntrySchema}), createMoodEntryHandler);

router.route("/:id")
        .get(zodValidation({params: ObjectIdSchema}), getMoodEntryByIdHandler);

export default router;