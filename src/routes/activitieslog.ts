import express from "express";
import { getAllActivities } from "../controllers/activitieslog.js";
import { authorize, protect } from "../middleware/auth.js";

const Logsrouter = express.Router();

Logsrouter.get("/", protect, authorize(["admin", "teacher"]), getAllActivities);

export default Logsrouter;
