import config from "../../config"
import { TStudent } from "../student/studentInterface"
import { Student } from "../student/studentModel"
import { TUser } from "./userInterface"
import { User } from "./userModel"

const createStudentService = async (password:string, student: TStudent) => {
  let userdata:Partial<TUser> = {}

  // if password not provide than use default password 
  userdata.password = password || (config.default__password as string)
  // set student role 
  userdata.role = 'student'
  // manual id 
  userdata.id = '203010003'
  // create student
  const newUser =await User.create(userdata)

  // check create user and than crate student
  if(Object.keys(newUser).length){
    //set id and _id for reference
    student.id = newUser.id 
    student.user = newUser._id
    const newStudent = await Student.create(student)
    return newStudent
  }

  }


export const UserService ={
    createStudentService
} 