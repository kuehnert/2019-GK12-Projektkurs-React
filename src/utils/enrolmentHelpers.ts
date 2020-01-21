import { isSameDay } from 'date-fns';
import { Enrolment, Absence, AbsenceType } from '../features/enrolments/enrolmentSlice';

export function absentOnDate(enrolment: Enrolment, date: Date): boolean {
  const result = enrolment.absences.find(a => isSameDay(new Date(a.date), date));
  return result != null;
}

export function absenceExcused({ type }: Absence): boolean {
  return type !== AbsenceType.UNENTSCHULDIGT && type !== AbsenceType.ABGELAUFEN;
}

export function homeworkIssueOnDate(enrolment: Enrolment, date: Date): boolean {
  return enrolment.homeworkIssues.some(hw => isSameDay(new Date(hw.date), date));
}
