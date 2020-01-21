import { isSameDay } from 'date-fns';
import { Enrolment, Absence, AbsenceTypes } from '../features/enrolments/enrolmentSlice';

export function absentOnDate(enrolment: Enrolment, date: Date): boolean {
  const result = enrolment.absences.find(a => isSameDay(new Date(a.date), date));
  return result != null;
}

export function absenceExcused({ type }: Absence): boolean {
  return type !== AbsenceTypes.UNENTSCHULDIGT && type !== AbsenceTypes.ABGELAUFEN;
}
