import mongoose, {Schema, Document} from "mongoose"

export interface IActivityLog extends Document{
    user: mongoose.Types.ObjectId;
    action: string;
    details?: string;
    createdAt: Date;
}


const activitiesLogSchema: Schema<IActivityLog> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    }
}, {timestamps: true})

const ActivitiesLog = mongoose.model<IActivityLog>("ActivitiesLog", activitiesLogSchema)
export default ActivitiesLog