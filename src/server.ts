import cookieParser from "cookie-parser";
import express from "express";
import type { Application, Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/index.js";
import { generateExam, generateTimeTable, handleExamSubmission } from "./inngest/functions.js"
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import Logsrouter from "./routes/activitieslog.js";
import academicYearRouter from "./routes/academicYear.js";
import classRouter from "./routes/class.js";
import subjectRouter from "./routes/subject.js";
import timeRouter from "./routes/timetable.js";
import examRouter from "./routes/exam.js";
import dashboardRouter from "./routes/dashboard.js";
import attendanceRoutes from "./routes/attendance.js";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/activities", Logsrouter);
app.use("/api/academic-years", academicYearRouter);
app.use("/api/classes", classRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/timetables", timeRouter);
app.use("/api/exams", examRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/inngest", serve({ client: inngest, functions: [generateTimeTable, generateExam,handleExamSubmission] }));


app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ status: "Error", message: err.message });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
