import mongoose, {Schema, Document, mongo} from "mongoose"

export interface IPeriod {
    subject: mongoose.Types.ObjectId;
    teacher: mongoose.Types.ObjectId;
    startTime: string;
    endTime: string;
}

export interface IDaySchedule{
    day:string;
    periods: IPeriod[];
}


export interface ITimetable extends Document {
    class: mongoose.Types.ObjectId;
    academicYear: mongoose.Types.ObjectId;
    schedule: IDaySchedule[];
    createdAt: Date;
}


const timetableSchema: Schema<ITimetable> = new Schema(
    {
        class: {type: Schema.Types.ObjectId, ref: "Class", required: true},
        academicYear: {
            type: Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: true,
        },
        schedule: [
            {
                day: {type: String, required: true},
                periods: [
                    {
                        subject: {type: Schema.Types.ObjectId, ref: "Subject"},
                        teacher: {type: Schema.Types.ObjectId, ref: "User"},
                        startTime: {type: String},
                        endTime: {type: String}
                    }
                ]
            }
        ]
    }, {timestamps: true}
)

timetableSchema.index({class:1, academicYear: 1}, {unique: true})

const Timetable = mongoose.model<ITimetable>("Timetable", timetableSchema)
export default Timetable