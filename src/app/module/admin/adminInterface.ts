import { Types } from "mongoose"
import { Name } from "../student/studentInterface"

type Tadmin = {
    id:string
    name: Name,
    gender: 'Male' | 'Female',
    password: string,
    email: string,
    avatar?: string
    dateOfBirth: string
    contactNumber: string
    emergencyContactNumber: string
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
    presentAddress: string
    profileImage?: string
    isDeleted: boolean
    permanentAddress:string
    user:Types.ObjectId
}

export default Tadmin