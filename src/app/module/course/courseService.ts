import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { TassignFaculty, TCourse } from './courseInterface'
import { Course, CourseFaculty } from './courseModel'
import AppError from '../../ERROR/App__Error'
import httpStatus from 'http-status'

const createCourseService = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourseService = async (quiry: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourse.course'),
        quiry,
    )
        .search(['title', 'prefix', 'code'])
        .filter()
        .sort()
        .pagination()
        .fields()

    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseService = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourse.course')
    return result
}

const updateCourseService = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...courseRemaining } = payload

    // Start a session
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Update basic course information
        const updatedCourse = await Course.findByIdAndUpdate(id, courseRemaining, {
            new: true,
            runValidators: true,
            session,
        })

        if (!updatedCourse) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update basic information',
            )
        }

        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            // Handle deleted pre-requisite courses
            const deletedPreRequisiteCourse = preRequisiteCourse
                .filter(({ course, isDeleted }) => course && isDeleted)
                .map(({ course }) => course)

            if (deletedPreRequisiteCourse.length > 0) {
                await Course.findByIdAndUpdate(
                    id,
                    {
                        $pull: {
                            preRequisiteCourse: {
                                course: { $in: deletedPreRequisiteCourse },
                            },
                        },
                    },
                    { new: true, runValidators: true, session },
                )
            }

            // Handle new pre-requisite courses
            const newPreRequisiteCourse = preRequisiteCourse.filter(
                ({ course, isDeleted }) => course && !isDeleted,
            )

            if (newPreRequisiteCourse.length > 0) {
                await Course.findByIdAndUpdate(
                    id,
                    {
                        $addToSet: {
                            preRequisiteCourse: { $each: newPreRequisiteCourse },
                        },
                    },
                    { new: true, runValidators: true, session },
                )
            }
        }

        // Commit the transaction
        await session.commitTransaction()
        session.endSession()

        // Fetch and populate the updated course data
        const result = await Course.findById(id).populate(
            'preRequisiteCourse.course',
        )
        return result
    } catch (error) {
        // Rollback the transaction
        await session.abortTransaction()
        session.endSession()

        // Rethrow the error with additional context if needed
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to update course',
        )
    }
}

const softDeleteCourseService = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    )
    return result
}

const assingFacultyControllerService = async (
    id: string,
    faculties: Partial<TassignFaculty>,
) => {
    const reuslt = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course:id,
            $addToSet: { faculties: { $each: faculties } },
        },
        {
            upsert: true,
            new: true,
            runValidators: true,
        },
    )
    return reuslt
}
const removeFacultyControllerService = async (
    id: string,
    faculties: Partial<TassignFaculty>,
) => {
    const reuslt = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: faculties } },
        },
        {
            new: true,
            runValidators: true,
        },
    )
    return reuslt
}

export const courseService = {
    createCourseService,
    getAllCourseService,
    getSingleCourseService,
    updateCourseService,
    softDeleteCourseService,
    assingFacultyControllerService,
    removeFacultyControllerService
}
