import type { Request,Response } from "express";
import Class from "../models/class.js";
import { logActivity } from "../utils/activitieslog.js";


export const createClass = async(
    req: Request,
    res: Response,
) => {
try {
    const {name, academicYear, classTeacher, capacity} = req.body;
    const existingClass = await Class.findOne({name,academicYear})
    if (existingClass) {
        return res.status(400).json({message: "Class with this name already exists for the specified academic year."}) 
    }
    const newClass = await Class.create({
        name,
        academicYear,
        classTeacher,
        capacity
    })

     await logActivity({
      userId: (req as any).user._id.toString(),
      action: `Created new class ${newClass.name}`,
    });
    res.status(201).json(newClass);
} catch (error) {
    res.status(500).json({message: "Server Error", error});
}
}


export const updateClass = async (
    req:Request,
    res: Response
) => {
try {
    const classId = req.params.id
    const currentClass = await Class.findById(classId);
      if (!currentClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }
    const {name, academicYear} = req.body;
    const newName = name ?? currentClass.name;
const newAcademicYear = academicYear ?? currentClass.academicYear;

    const existingClass = await Class.findOne({name: newName ,academicYear: newAcademicYear, _id: {$ne: classId as string}})
      if (existingClass) {
      res.status(400).json({
        message:
          "Class with this name already exists for the specified academic year.",
      });
      return;
    }
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            req.body,
            {new: true, runValidators: true}
        )
        if(!updatedClass) {
            return res.status(404).json({message: "Class not found"})
        }
         await logActivity({
      userId: (req as any).user._id.toString(),
      action: `Updated class ${updatedClass?.name}`,
    });
    res.status(200).json(updatedClass);
} catch (error) {
    res.status(500).json({message: "Server Error", error});
}
}



export const deleteClass = async (
    req:Request,
    res:Response,
) => {
try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
        return res.status(404).json({message: "Class not found"})
    }
     await logActivity({
      userId: (req as any).user._id.toString(),
      action: `Deleted class ${deletedClass?.name}`,
    });
    res.json({message: "Class removed"});
} catch (error: any) {
    res.status(500).json({message: error.message});
}
}



export const getAllClasses = async (
    req:Request,
    res:Response,
) => {
try {
     const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const query: any = {}
    if(search){
        query.name = {$regex: search, $options: "i"}
    }
    
      const [total,classes] = await Promise.all([
        Class.countDocuments(query),
        Class.find(query)
        .populate("academicYear", "name")
        .populate("classTeacher", "name email")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
      ])

      
  res.json({
    classes,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    }
  })
} catch (error) {
    res.status(500).json({message: "Server Error", error});
}
}