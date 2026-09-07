import express from "express";
import { createSubject, deleteSubject, getAllSubjects, updateSubject } from "../controllers/subject.js";
import { authorize, protect } from "../middleware/auth.js";

const subjectRouter = express.Router();

subjectRouter.route("/create")
.post(protect, authorize(["admin"]) ,createSubject)

subjectRouter.route("/")
.get(protect, authorize(["admin", "teacher"]) ,getAllSubjects)


subjectRouter.route("/update/:id")
.patch(protect, authorize(["admin"]) ,updateSubject)


subjectRouter.route("/delete/:id")
.delete(protect, authorize(["admin"]) ,deleteSubject)


export default subjectRouter