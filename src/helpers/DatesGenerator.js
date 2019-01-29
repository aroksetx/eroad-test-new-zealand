import { month } from '../constants';

export const getDateArray = (year) => {
    const arr = [];
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    while (startDate <= endDate) {
        arr.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }
    return arr;
};

export const calendarDatesList = (yearDateList) => {
    const calendar = new Map();
    yearDateList.forEach(data => {
        const dataStructure = {
            dayIndex: data.getDay(),
            date: data.getDate(),
            isMarked: false,
            holidayColor: null
        };

        calendar.has(month[data.getMonth()])
            ? calendar.get(month[data.getMonth()]).push(dataStructure)
            : calendar.set(month[data.getMonth()], [dataStructure]);
    });
    return calendar;
}

export const balanceDates = (month, values) => {
    const montDates = values;
    if(montDates === undefined) return;
    return montDates[0].dayIndex > 0
        ? new Array(Math.abs(0 - montDates[0].dayIndex))
            .fill({})
            .map((item, index) => {
                return {
                    dayIndex: index,
                    date: 0,
                    isMarked: false,
                    holidayColor: null
                }
            }).concat(montDates)
        : montDates;
};

