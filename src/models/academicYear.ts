import mongoose, {Schema, Document} from "mongoose"

export interface IAcademicYear extends Document {
    name: string;
    fromYear: Date;
    toYear: Date;
    isCurrent: boolean;
}


const academicYearSchema: Schema<IAcademicYear> = new Schema({
    name: {
        type: String,
        required: true,
    },
    fromYear: {
        type: Date,
        required: true,
    },
    toYear: {
        type: Date,
        required: true,
    },
    isCurrent:{
       type: Boolean,
       default: false,
    }
}, {timestamps: true})

const AcademicYear = mongoose.model<IAcademicYear>("AcademicYear", academicYearSchema)
export default AcademicYear