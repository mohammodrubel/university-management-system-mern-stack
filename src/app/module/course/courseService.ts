import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse } from "./courseInterface";
import { Course } from "./courseModel";

const createCourseService = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourseService = async (quiry: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourse.course'), quiry)
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

const updateCourseService = async (id:string, payload:Partial<TCourse>) => {
    // Separate pre-requisite courses from the rest of the payload
    const { preRequisiteCourse, ...courseRemaining } = payload;

    // Update basic course information
    await Course.findByIdAndUpdate(
        id,
        courseRemaining,
        { new: true, runValidators: true }
    );

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
        // Extract and delete pre-requisite courses marked as deleted
        const deletedPreRequisiteCourse = preRequisiteCourse
            .filter(({ course, isDeleted }) => course && isDeleted)
            .map(({ course }) => course);

        if (deletedPreRequisiteCourse.length > 0) {
            await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourse: { course: { $in: deletedPreRequisiteCourse } },
                    },
                },
                { new: true }
            );
        }

        // Extract and add new pre-requisite courses
        const newPreRequisiteCourse = preRequisiteCourse.filter(
            ({ course, isDeleted }) => course && !isDeleted
        );

        if (newPreRequisiteCourse.length > 0) {
            await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourse: { $each: newPreRequisiteCourse },
                    },
                },
                { new: true }
            );
        }
    }

    // Fetch and populate the updated course data
    const result = await Course.findById(id).populate('preRequisiteCourse.course');
    return result;
};


const softDeleteCourseService = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result
}

export const courseService = {
    createCourseService,
    getAllCourseService,
    getSingleCourseService,
    updateCourseService,
    softDeleteCourseService
}