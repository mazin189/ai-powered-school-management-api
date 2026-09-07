import type { Request, Response } from "express";
import Subject from "../models/subject.js";
import { logActivity } from "../utils/activitieslog.js";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, teacher, isActive } = req.body;

    const subjectExists = await Subject.findOne({ code });
    if (subjectExists) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    const subject = await Subject.create({
      name,
      code,
      isActive,
      teacher: Array.isArray(teacher) ? teacher : [],
    });

    if (subject) {
      await logActivity({
        userId: (req as any).user._id.toString(),
        action: `Created subject: ${subject?.name}`,
      });
      res.status(201).json(subject);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const [total, subjects] = await Promise.all([
      Subject.countDocuments(query),
      Subject.find(query)
        .populate("teacher", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    res.json({
      subjects,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, teacher, isActive } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        name,
        code,
        isActive,
        teacher: Array.isArray(teacher) ? teacher : [],
      },
      { new: true, runValidators: true },
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await logActivity({
      userId: (req as any).user._id.toString(),
      action: `Updated subject ${updatedSubject?.name}`,
    });

    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};




export const deleteSubject = async (req: Request,res:Response) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        if (!deletedSubject) {
            return res.status(404).json({message: "Subject not found"})
        }
         await logActivity({
      userId: (req as any).user._id.toString(),
      action: `Deleted subject ${deletedSubject?.name}`,
    });
    res.status(200).json({ message: "Subject deleted successfully"})   
    } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    }
}