import { setHours, setMinutes, format, addMinutes } from "date-fns"

export function generateDayTimeList(date: Date): string[] {
    const startTime = setMinutes(setHours(date, 9), 0); //set start time to 09:00
    const endTime = setMinutes(setHours(date, 21), 0) // set end time to 21:00
    const interval = 45; // interval in minutes
    const timeList: string[] = []

    let currentTIme = startTime

    while (currentTIme < endTime) {
        timeList.push(format(currentTIme, "HH:mm"));
        currentTIme = addMinutes(currentTIme, interval);
    }
    return timeList;
}