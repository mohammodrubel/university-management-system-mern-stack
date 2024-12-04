import { model, Schema } from "mongoose";
import { TacademicDepertment } from "./academicDepartmentInterface";
import AppError from "../../middleware/App__Error";
import httpStatus from "http-status";

const academicDepertmentSchema = new Schema<TacademicDepertment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    }
}, {
    timestamps: true
})


academicDepertmentSchema.pre('save', async function (next) {
    // if depertment exist 
    const isDepertmentExist = await AcademicDepertment.findOne({ name: this.name })
    if (isDepertmentExist) {
        throw new AppError(httpStatus.FORBIDDEN,'this depertment already exist')
    }
    next()
})

academicDepertmentSchema.pre('findOneAndUpdate',async function(next){
    const query =  this.getQuery()
    const isValidID = await AcademicDepertment.findOne(query)
        if(!isValidID){
           throw new AppError (httpStatus.NOT_FOUND,'INVALID academic depertment')
        }
    next()
})



export const AcademicDepertment = model<TacademicDepertment>('academicDepertment', academicDepertmentSchema)