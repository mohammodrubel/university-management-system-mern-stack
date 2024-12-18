import AppError from "../../ERROR/App__Error"
import { days } from "./offerCourseInterface"

type TSchedule = {
    days: days[],
    startTime: string,
    endTime: string
}
export const hasTimeConfilgs = (assigndSchedule: TSchedule[], newSchedule: TSchedule) => {
    for (const schedule of assigndSchedule) {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)
        if (newStartTime < existingStartTime && newEndTime > existingEndTime) {
            return true
        }
    }
    return false
}