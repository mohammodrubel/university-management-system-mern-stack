import httpStatus from "http-status";
import AppError from "../../ERROR/App__Error";
import { AcademicDepertment } from "../academicDepartment/academicDepertmentModel";
import { AcademicFaculty } from "../academicFaculty/academicFacultyModel";
import { Course } from "../course/courseModel";
import { Faculty } from "../faculty/facultyModel";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistrationModel";
import { TOfferCourse } from "./offerCourseInterface";
import { OfferCourse } from "./offerCourseModel";

const createOfferCourseService = async (payload: TOfferCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, maxCapacity, section, days, startTime, endTime } = payload;

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
    const academicSemesterIsExist = semesterRegisterIsExist.academicSemester;
    if (!academicSemesterIsExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester Not Found');
    }

    // Check if department belongs to the faculty
    const ifDepartmentBelongToFaculty = await AcademicDepertment.findOne({ academicFaculty, academicDepartment });
    if (ifDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, `This ${academicDepartment} does not belong to this ${academicFaculty}`);
    }
}

const getAllOfferCourseService = async () => {

}
const getSingleOfferCourseService = async () => {

}
const updateOfferCourseService = async () => {

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