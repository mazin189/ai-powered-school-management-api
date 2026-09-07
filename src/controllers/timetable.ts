import type { Request, Response } from "express";
import { logActivity } from "../utils/activitieslog.js";
import { inngest } from "../inngest/index.js";
import Timetable from "../models/timetable.js";



export const generateTimetable = async (
    req:Request,
    res:Response
) => {
    try {
        const {classId, academicYearId,settings} = req.body;
        
        await inngest.send({
            name: "generate/timetable",
            data:{
                classId,
                academicYearId,
                settings
            }
        })

         await logActivity({
              userId: (req as any).user._id.toString(),
              action: `Requested timetable generation for class ID: ${classId}`,
            });

            res.status(200).json({message: "Timetable generation initiated"})
    } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    }
}



export const getTimetable = async (req:Request, res:Response) => {
    try {
        const timetable = await Timetable.findOne({class: req.params.classId as string})
        .populate("schedule.periods.subject" , "name code")
        .populate("schedule.periods.teacher" , "name email")

        if(!timetable) {
            return res.status(404).json({message: "Timetable not found"})
        }
        res.json(timetable)
    } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    }
}