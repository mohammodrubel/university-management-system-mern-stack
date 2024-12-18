import httpStatus from "http-status";
import AppError from "../../ERROR/App__Error";
import { AcademicDepertment } from "../academicDepartment/academicDepertmentModel";
import { AcademicFaculty } from "../academicFaculty/academicFacultyModel";
import { Course } from "../course/courseModel";
import { Faculty } from "../faculty/facultyModel";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistrationModel";
import { TOfferCourse } from "./offerCourseInterface";
import { OfferCourse } from "./offerCourseModel";
import { hasTimeConfilgs } from "./offerCourse.utils";

const createOfferCourseService = async (payload: TOfferCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, maxCapacity, section, days, startTime, endTime } = payload;
    console.log(payload)

    // Check if semester registration exists
    const semesterRegisterIsExist = await SemesterRegistration.findById(semesterRegistration);
    if (!semesterRegisterIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration Not Found');
    }

    // Check if academic faculty exists
    const academicFacultyIsExist = await AcademicFaculty.findById(academicFaculty);
    if (!academicFacultyIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty Not Found');
    }

    // Check if academic department exists
    const academicDepartmentIsExist = await AcademicDepertment.findById(academicDepartment);
    if (!academicDepartmentIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department Not Found');
    }

    // Check if course exists
    const courseIsExist = await Course.findById(course);
    if (!courseIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found');
    }

    // Check if faculty exists
    const facultyIsExist = await Faculty.findById(faculty);
    if (!facultyIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
    }

    // Check if academic semester exists
    const academicSemester= semesterRegisterIsExist.academicSemester;

    const isDepertmentExistOnFaculty = await AcademicDepertment.findOne({
        _id:payload.academicDepartment,
        academicFaculty
    })

    if(!isDepertmentExistOnFaculty){
        throw new AppError(httpStatus.NOT_FOUND,'depertment not fuond under the faculty')
    }

    // offer course checked 
    const isOfferedCourseExistWithSameSemesterCourseAndSection = await OfferCourse.findOne({
        semesterRegistration,
        course,
        section
    })

    if(isOfferedCourseExistWithSameSemesterCourseAndSection){
        throw new AppError(
            httpStatus.CONFLICT,
            'Offered Course already exist with same semester, course and section',
          );
    }

    const assignSchedule = await OfferCourse.find({
        semesterRegistration,
        faculty,
        days: {$in:days}
    }).select("days startTime endTime")

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if(hasTimeConfilgs(assignSchedule,newSchedule)){
        throw new AppError(
            httpStatus.CONFLICT,
            'The faculty is unavailable during this time slot. Please choose a different time or day.'
        );
    }
    
    const result = await OfferCourse.create({...payload,academicSemester})
    return result
}

const getAllOfferCourseService = async () => {
    const result = await OfferCourse.find({})
    return result 
}
const getSingleOfferCourseService = async (id:string) => {
    const result = await OfferCourse.findById(id)
    return result
}
const updateOfferCourseService = async (
    payload: Pick<TOfferCourse, "faculty" | "startTime" | "endTime" | "days">,
    id: string
) => {
    const {faculty,startTime,endTime,days} = payload
    const offerCourseIsExist = await OfferCourse.findById(id)
    if (!offerCourseIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'The provided ID does not match any existing offer course. Please check the ID and try again.');
    }

   

    const isFacultyExist = await Faculty.findById(payload.faculty)
    if(isFacultyExist){
        throw new AppError(httpStatus.NOT_FOUND, 'The provided ID does not match any existing Faculty. Please check the ID and try again.');
    }


    const semesterRegistration = offerCourseIsExist.semesterRegistration
    const semesterRegisterStatus =await SemesterRegistration.findById(semesterRegistration)
        
    if(semesterRegisterStatus?.status !== 'UPCOMING'){
        throw new AppError(httpStatus.NOT_FOUND,`you can not update this offer course ${semesterRegisterStatus}`);
    }

    const assignSchedule = await OfferCourse.find({
        semesterRegistration,
        faculty,
        days:{$in:days},
    }).select("days startTime endTime")

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if(hasTimeConfilgs(assignSchedule,newSchedule)){
        throw new AppError(httpStatus.CONFLICT,'this faculty is not avalable at the time choose other time or day')
    }

    const result = await OfferCourse.findByIdAndUpdate(id,payload,{new:true})
    return result
}
const softDeleteOfferCourseService = async () => {

}

export const offerCourseService = {
    createOfferCourseService,
    getAllOfferCourseService,
    getSingleOfferCourseService,
    updateOfferCourseService,
    softDeleteOfferCourseService
}