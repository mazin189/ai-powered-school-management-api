import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { generateTimetable, getTimetable } from "../controllers/timetable.js";

const timeRouter = express.Router();

timeRouter.post("/generate", protect, authorize(["admin"]), generateTimetable)

timeRouter.get("/:classId", protect, getTimetable)

export default timeRouter;