import { model, Schema } from "mongoose";
import { TFaculty } from "./facultyInterface";

const facultySchema = new Schema<TFaculty>({
    academicDepartment: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'academicDepertment'
    },
    bloodGroup: {
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
        type: String
    },
    contactNo: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male' , 'Female'],
        required: true
    },
    profileImage: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    permanentAddress:{
        type:String,
        required:true
    },
    presentAddress:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
},{
    timestamps:true
})


export const Faculty = model<TFaculty>('faculty', facultySchema)