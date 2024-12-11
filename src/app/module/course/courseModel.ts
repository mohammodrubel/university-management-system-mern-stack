import { model, Schema } from "mongoose";
import { TCourse, TpreRequisiteCourses } from "./courseInterface";

const preRequisiteCourseSchema = new Schema<TpreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
const courseSchema = new Schema<TCourse>({
    title:{
        type:String,
        required:true,
        unique:true 
    },
    prefix:{
        type:String,
        required:true,
        trim:true
    },
    code:{
        type:Number,
        required:true,
        unique:true ,
    },
    preRequisiteCourse:[preRequisiteCourseSchema]

},{
    timestamps:true
})


export const Course = model<TCourse>('course',courseSchema)