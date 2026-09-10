import type { Request, Response } from "express";
import Attendance from "../models/attendance.js";
import Class from "../models/class.js";

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { student, class: classId, status } = req.body;

    if (!student || !classId || !status) {
      return res.status(400).json({
        message: "student, class and status are required",
      });
    }

    if (!["present", "absent"].includes(status)) {
      return res.status(400).json({
        message: "Invalid attendance status",
      });
    }

    const currentClass = await Class.findById(classId);
    if (!currentClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    if (
      (req as any).user.role === "teacher" &&
      currentClass.classTeacher?.toString() !== (req as any).user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not the teacher of this class",
      });
    }

    if (!currentClass.students.some((std) => std.toString() === student)) {
      return res.status(403).json({
        message: "Student does not belong to this class",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      student,
      class: classId,
      date: today,
      status,
    });

    res.status(201).json(attendance);
  } catch (error: any) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getClassAttendance = async (req: Request, res: Response) => {
  try {
    const classId = req.params.class;

    if (!classId) {
      return res.status(400).json({
        message: "Invalid class id",
      });
    }

    const currentClass = await Class.findById(classId);

    if (!currentClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    if (
      (req as any).user.role === "teacher" &&
      currentClass.classTeacher?.toString() !== (req as any).user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not the teacher of this class",
      });
    }

    const attendance = await Attendance.find({
      class: classId,
    })
      .populate("student", "name email")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error: any) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.student;

    if (!studentId) {
      return res.status(400).json({
        message: "Invalid student id",
      });
    }

    const attendance = await Attendance.find({
      student: studentId,
    })
      .populate("class", "name")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error: any) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
