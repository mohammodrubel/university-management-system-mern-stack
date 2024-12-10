import { model, Schema } from 'mongoose'
import validator from 'validator'
import { Guardian, Name, TStudent } from './studentInterface'


const UserNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    minlength: [5, 'minimum 5 caractar length ${VALUE}'],
    maxlength: [20, 'maximum 20 carector '],
  },
  middleName: {
    type: String,
    required: [true, 'Middle name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    validate: {
      validator: value => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const GuardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
})

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Student name is required.'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender is required.'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required.'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar is required.'],
  },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  guardian: {
    type: GuardianSchema,
    required: [true, 'Guardian information is required.'],
  },
 
  localeGuardian: {
    name:{
        type:String,
        required:true,
    },
    occupation:{
        type:String,
        required:true,
    },
    middleName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
  },
  user:{
    type:Schema.Types.ObjectId,
    required:[true,'user is is required'],
    ref:'User',
    unique:true
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
 
  isDeleted:{
    type:Boolean,
    default:false
  },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:'academicSemester'
  },
  academicDepertment:{
    type:Schema.Types.ObjectId,
    ref:'academicDepertment'
  },
  profileImage: String,
},{
  timestamps:true
})



studentSchema.statics.isUserExists = async function (id:string){
  const existingUser = await Student.findOne({id})
  return existingUser
}

export const Student = model<TStudent>('Student', studentSchema)
