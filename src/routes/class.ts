import express from "express";
import { createClass, deleteClass, getAllClasses, updateClass } from "../controllers/class.js";
import { authorize, protect } from "../middleware/auth.js";

const classRouter = express.Router();

classRouter.post("/create", protect, authorize(["admin"]), createClass)
classRouter.patch("/update/:id", protect, authorize(["admin"]) , updateClass)
classRouter.delete("/delete/:id", protect, authorize(["admin"]) , deleteClass)
classRouter.get("/", protect, authorize(["admin"]) , getAllClasses)
export default classRouter