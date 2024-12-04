import { model, Schema } from "mongoose";
import { TacademicFaculty } from "./academicFacultyInterface";
import AppError from "../../middleware/App__Error";

const academicFacutySchema = new Schema<TacademicFaculty>({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

academicFacutySchema.pre('save',async function(next){
    const isFacultyExist = await AcademicFaculty.findOne({name:this.name})
    if(isFacultyExist){
        throw new AppError(403,'this faculty already is exist')
    }
    next()
})


academicFacutySchema.pre('findOneAndUpdate',async function(next){
    const query =  this.getQuery()
    const isValidID = await AcademicFaculty.findOne(query)
        if(!isValidID){
            throw new AppError (401,'INVALID academic depertment')
        }
    next()
})



export const AcademicFaculty = model<TacademicFaculty>('academicFaculty',academicFacutySchema)


