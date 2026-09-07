import express from "express"
import { authorize, protect } from "../middleware/auth.js"
import { triggerExamGeneration,getExamById,toggleExamStatus,submitExam, getExamResult, getExams} from "../controllers/exam.js"

const examRouter = express.Router()

examRouter.post("/generate", protect, authorize(["teacher", "admin"]), triggerExamGeneration)
examRouter.post("/:id/submit", protect, authorize(["student", "admin"]), submitExam)
examRouter.patch("/:id/status", protect, authorize(["teacher", "admin"]), toggleExamStatus)
examRouter.get("/:id/result", protect, authorize(["teacher", "student", "admin"]), getExamResult)
examRouter.get("/:id", protect, authorize(["teacher", "student", "admin"]), getExamById)
examRouter.get("/", protect, authorize(["teacher", "student", "admin"]), getExams)




export default examRouter