import { model, Schema } from "mongoose";
import { TAaademicSemester } from "./academicSemesterInterface";


const academicSemesterSchema = new Schema<TAaademicSemester>({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true,
    },
    endMonth: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true,
    },
}, {
    timestamps: true
});

// check 'Autumn', 'Summer', 'Fall' and same year 
academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExist = await AcademicSemester.findOne({year:this.year,name:this.name})
        if(isSemesterExist){
            throw new Error('semester is already exist')
        }
        next ()
})





export const AcademicSemester = model<TAaademicSemester>("academicSemester", academicSemesterSchema)