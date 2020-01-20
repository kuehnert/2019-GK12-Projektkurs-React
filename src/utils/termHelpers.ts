import * as dateFns from 'date-fns';
import { Period } from '../features/terms/termSlice';

export type TimetableLesson = { weekday: number; periodNo: number };

export const getCurrentPeriod = (periods: Period[]) => {
  const time = new Date();
  const dateFields = { year: dateFns.getYear(time), month: dateFns.getMonth(time), date: dateFns.getDate(time) };
  const weekday = (dateFns.getDay(time) + 6) % 7;

  const adjusted = periods.map(p => ({
    ...p,
    start: dateFns.set(dateFns.parseJSON(p.start), dateFields),
    end: dateFns.set(dateFns.parseJSON(p.end), dateFields),
  }));

  const period = adjusted.find(p => dateFns.isWithinInterval(time, p));

  return period ? { weekday, periodNo: period.number } : null;
};

export const isCurrentPeriod = (a: TimetableLesson, b: TimetableLesson | null): boolean => {
  return a != null && b != null && a.weekday === b.weekday && a.periodNo === b.periodNo;
};
