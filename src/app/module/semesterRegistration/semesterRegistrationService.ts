import httpStatus from "http-status"
import AppError from "../../ERROR/App__Error"
import { TsemesterRegistration } from "./semesterRegistrationInterface"
import { SemesterRegistration } from "./semesterRegistrationModel"
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import QueryBuilder from "../../builder/QueryBuilder";
import { semesterRegistrationStatus } from "./semesterRegistrationConstant";

const CreatesemesterRegistrationService = async (payload: TsemesterRegistration) => {
    // Step 1: Validate if the academic semester exists
    const isAcademicSemesterExist = await AcademicSemester.findById(payload.academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'The referenced academic semester does not exist');
    }

    // Step 2: Check if there is an existing registration with 'UPCOMING' or 'ONGOING' status
    const existingRegistration = await SemesterRegistration.findOne({
        $or: [
            { status: semesterRegistrationStatus.UPCOMING },
            { status: semesterRegistrationStatus.ONGOING },
        ],
    });

    if (existingRegistration) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `A semester registration with status '${existingRegistration.status}' already exists`
        );
    }

    // Step 3: Check if a semester registration already exists for the academic semester
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academicSemester: payload.academicSemester,
    });

    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.CONFLICT, 'A registration for this academic semester already exists');
    }

    // Step 4: Create the semester registration
    const result = await SemesterRegistration.create(payload);
    return result;
};

const getAllsemesterRegistrationService = async (query: Record<string, unknown>) => {
    const semeesterRegister = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query)
        .search(['status']).filter().sort().pagination().fields()
    const result = await semeesterRegister.modelQuery
    return result
}
const getSinglesemesterRegistrationService = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester')
    return result
}
const updateSemesterRegistrationService = async (id: string, payload: Partial<TsemesterRegistration>) => {

    const currentSemester = await SemesterRegistration.findById(id);
    if (!currentSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'A registration is not found');
    }

    // if requested semester is ended 

    if (currentSemester?.status === semesterRegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `requested semester already ${currentSemester.status} `)
    }

    if (currentSemester.status === semesterRegistrationStatus.UPCOMING && payload.status === semesterRegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `you can not change status Dirictly. semester register flow is "UPCOMING => ONGOING => ENDED" `)
    }

    if (currentSemester.status === semesterRegistrationStatus.ONGOING && payload.status === semesterRegistrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `you can not change status Dirictly. semester register flow is "UPCOMING => ONGOING => ENDED" `)
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}
const softDeleteSemesterRegistrationService = async () => {

}

export const semesterRegistrationService = {
    CreatesemesterRegistrationService,
    getAllsemesterRegistrationService,
    getSinglesemesterRegistrationService,
    updateSemesterRegistrationService,
    softDeleteSemesterRegistrationService
}