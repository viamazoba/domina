import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    taskName: string
    description: string
    userId: string
}

const TaskSchema: Schema = new Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })


const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task