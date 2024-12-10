import { Model, Types } from "mongoose"

export type Guardian = {
  fatherName: string
  motherName: string
  fatherOccupation: string
  motherOccupation: string
  fatherContactNumber: string
  motherContactNumber: string
}
export type Name = {
  firstName: string
  middleName: string
  lastName: string
}
type LocaleGuardian = {
  name: string
  occupation: string
  middleName: string
  lastName: string
}
export type TStudent = {
  user:Types.ObjectId
  id: string
  gender: 'Male' | 'Female'
  name: Name,
  password:string,
  email: string
  avatar?: string
  dateOfBirth: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localeGuardian: LocaleGuardian
  profileImage?: string
  isDeleted:boolean
  admissionSemester:Types.ObjectId
  academicDepertment:Types.ObjectId
}
// FOR CREATING STATIC 
// export interface studentModel extends Model <TStudent>{
//   isUserExists (id:string) : Promise <TStudent | null>
// }
// FOR CREATING INSTANCE 
// export type studentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>;
// }

// export type studentModel = Model<TStudent , Record<string,never> , studentMethod>

