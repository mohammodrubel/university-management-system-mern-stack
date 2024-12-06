import { User } from "./userModel";

const findLastStudent = async () => {
    const lastStudent = await User.findOne(
        { role: "student" },
        { id: 1, _id: 0 }
    )
        .sort({ createdAt: -1 })
        .lean();

    return lastStudent?.id;
};

const generateStudentId = async (payload:any) => {
    let currentId = "0";

    const lastStudentId = await findLastStudent();

    if (lastStudentId) {
        const lastStudentYear = lastStudentId.substring(0, 4);
        const lastStudentSemesterCode = lastStudentId.substring(4, 6);

        if (lastStudentYear === payload.year && lastStudentSemesterCode === payload.code) {
            currentId = lastStudentId.substring(6);
        }
    }

    const increment = (Number(currentId) + 1).toString().padStart(4, "0");
    const newStudentId = `${payload.year}${payload.code}${increment}`;
    return newStudentId;
};

export default generateStudentId;
