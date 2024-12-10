import { Types } from 'mongoose';
import { Name } from '../student/studentInterface';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: Name
  designation: string;
  gender:'Female' | 'Male';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}