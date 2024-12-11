import { model, Schema } from "mongoose";
import { TCourse, TpreRequisiteCourses } from "./courseInterface";

const preRequisiteCourseSchema = new Schema<TpreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref:'course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        trim: true
    },
    credits: { // Corrected field name
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    preRequisiteCourse: [preRequisiteCourseSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Course = model<TCourse>('course', courseSchema);
