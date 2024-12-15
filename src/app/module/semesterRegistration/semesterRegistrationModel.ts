import mongoose, { model, Schema } from "mongoose";
import { TsemesterRegistration } from "./semesterRegistrationInterface";

const semesterRegistrationSchema = new Schema<TsemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref:'academicSemester',
        unique:true,
        required:true
    },
    status: {
        type: 'String',
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    maxCredit: {
        type: Number,
        required: true,
        default:15
    },
    minCredit: {
        type: Number,
        required: true,
        default:3 
    }
}, {
    timestamps: true
})

export const SemesterRegistration = model<TsemesterRegistration>('semesterRegistration', semesterRegistrationSchema)