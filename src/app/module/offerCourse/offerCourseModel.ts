import { model, Schema } from "mongoose";
import { TOfferCourse } from "./offerCourseInterface";
import { Types } from "mongoose"


const offerCourseSchema = new Schema<TOfferCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "semesterRegistration"
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "academicSemester"
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty"
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "academicFaculty"
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "course"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "faculty"
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: {
        type: [String],
        enum: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const OfferCourse = model<TOfferCourse>('offerCourse', offerCourseSchema)
