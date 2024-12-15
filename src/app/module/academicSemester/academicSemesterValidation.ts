import { z } from "zod";

// Define the Zod schema for months
const MonthEnum = z.enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]);

// Define the Zod schema for TAaademicSemester
export const AcademicSemesterSchemaValidation = z.object({
    body: z.object({
        name: z.enum(["Autumn", "Summar", "Fall"]),
        code: z.enum(["01", "02", "03"]),
        year: z.string(),
        startMonth: MonthEnum,
        endMonth: MonthEnum,
    })
});

export default AcademicSemesterSchemaValidation