import { Router } from "express";
import { getClassAttendance, getStudentAttendance, markAttendance } from "../controllers/attendance.js";
import { authorize, protect } from "../middleware/auth.js";

const attendanceRoutes = Router();

attendanceRoutes.post("/", protect, authorize(["admin", "teacher"]), markAttendance);
attendanceRoutes.get("/class/:class", protect, authorize(["admin", "teacher"]), getClassAttendance);
attendanceRoutes.get("/student/:student", protect, authorize(["admin", "teacher"]), getStudentAttendance);

export default attendanceRoutes;
