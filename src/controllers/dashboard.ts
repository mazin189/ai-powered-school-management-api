import type { Request, Response } from "express";
import ActivitiesLog from "../models/activitieslog.js";
import User from "../models/user.js";
import Class from "../models/class.js";
import Exam from "../models/exam.js";
import Submission from "../models/submission.js";
import Timetable from "../models/timetable.js";
import Attendance from "../models/attendance.js";

const getTodayName = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    let stats = {};

    const activityQuery = user.role === "admin" ? {} : { user: user._id };
    const recentActivities = await ActivitiesLog.find(activityQuery)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name");

    const formattedActivity = recentActivities.map(
      (log) =>
        `${(log.user as any).name}: ${log.action} (${new Date(
          log.createdAt as any,
        ).toLocaleTimeString([], { hour: `2-digit`, minute: `2-digit` })})`,
    );

    if (user.role === "admin") {
      const totalStudents = await User.countDocuments({ role: "student" });
      const totalTeachers = await User.countDocuments({ role: "teacher" });
      const activeExams = await Exam.countDocuments({ isActive: true });

      const totalAttendance = await Attendance.countDocuments();
      const presentAttendance = await Attendance.countDocuments({
        status: "present",
      });

      const avgAttendance = totalAttendance > 0 ? `${((presentAttendance / totalAttendance) * 100).toFixed(1)}%` : "0%";

      stats = {
        totalStudents,
        totalTeachers,
        activeExams,
        avgAttendance,
        recentActivity: formattedActivity,
      };
    } else if (user.role === "teacher") {
      const myClassesCount = await Class.countDocuments({
        classTeacher: user._id,
      });

      const timetables = await Timetable.find({
        "schedule.periods.teacher": user._id,
      })
        .populate("class", "name")
        .populate("schedule.periods.subject", "name code")
        .populate("schedule.periods.teacher", "name email");

      const today = getTodayName();

      const todaySchedule = timetables.flatMap((timetable) => {
        return timetable.schedule.filter((d) => d.day === today);
      });

      const todayPeriods = todaySchedule.flatMap((todaySchedule) => {
        return todaySchedule.periods;
      });

      const now = new Date();

      const upcomingPeriods = todayPeriods.filter((period) => {
        const [hour, minute] = period.startTime
          .split(":")
          .map((timePart) => Number(timePart));
        const periodTime = new Date();
        periodTime.setHours(hour as number, minute as number, 0, 0);
        return periodTime > now;
      });

      const nextPeriod = upcomingPeriods.sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      )[0];

      const nextSubject = nextPeriod
        ? (nextPeriod.subject as any).name
        : "No upcoming classes";
      const nextSubjectTime = nextPeriod ? nextPeriod.startTime : "";

      const myExams = await Exam.find({ teacher: user._id }).select("_id");
      const myExamIds = myExams.map((exam) => exam._id);
      const pendingGrading = await Submission.countDocuments({
        exam: { $in: myExamIds },
        score: 0,
      });

      stats = {
        myClassesCount,
        pendingGrading,
        nextSubject,
        nextSubjectTime,
        recentActivity: formattedActivity,
      };
    } else if (user.role === "student") {

      const attendanceRecords = await Attendance.find({ student: user._id });
      const presentDays = attendanceRecords.filter((record) => record.status === "present").length;
      const totalDays = attendanceRecords.length;
      const myAttendance = totalDays > 0 ? `${((presentDays / totalDays) * 100).toFixed(1)}%` : "0%";


      const nextExam = await Exam.findOne({
        class: user.studentClass,
        dueDate: { $gte: new Date() },
      }).sort({ dueDate: 1 });

      const pendingAssignments = await Exam.countDocuments({
        class: user.studentClass,
        isActive: true,
        dueDate: { $gte: new Date() },
      });


      stats = {
        myAttendance,
        pendingAssignments,
        nextExam: nextExam?.title || "No upcoming exams",
        nextExamDate: nextExam
          ? new Date(nextExam.dueDate).toLocaleDateString()
          : "",
        recentActivity: formattedActivity,
      };
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
