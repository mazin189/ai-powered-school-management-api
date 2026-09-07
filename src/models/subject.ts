import mongoose, {Schema, Document} from "mongoose"

export interface ISubject extends Document {
    name: string;
    code: string;
    teacher?: mongoose.Types.ObjectId[];
    isActive: boolean;
}


const subjectSchema: Schema<ISubject> = new Schema({
name: {type: String, required: true},
code: {type: String, required:true, unique: true},
teacher: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
isActive: {type: Boolean, default:true}
},{timestamps: true})

const Subject = mongoose.model<ISubject>("Subject", subjectSchema)
export default Subject