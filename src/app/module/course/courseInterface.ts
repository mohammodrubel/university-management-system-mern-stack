import { Types } from "mongoose"

export type TpreRequisiteCourses= {
    course:Types.ObjectId,
    isDeleted:boolean
}
export type TCourse = {
    title:string,
    prefix:string,
    code:number,
    preRequisiteCourse:[TpreRequisiteCourses],
    credits:number,
    isDeleted:boolean
}