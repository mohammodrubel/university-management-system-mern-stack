import { Types } from "mongoose"

export type days = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri"

export type TOfferCourse = {
    semesterRegistration: Types.ObjectId
    academicSemester?: Types.ObjectId
    academicFaculty: Types.ObjectId
    academicDepartment: Types.ObjectId
    course: Types.ObjectId
    faculty: Types.ObjectId
    maxCapacity: Number
    section: Number
    days: days[]
    startTime: string
    endTime: string
}