import { isEqual } from 'date-fns';
import { Enrolment, Absence, AbsenceTypes } from '../features/enrolments/enrolmentSlice';

export function absentOnDate(enrolment: Enrolment, date: Date, unexcused: boolean | undefined = undefined): boolean {
  const result = enrolment.absences.find(a => isEqual(new Date(a.date), date));

  if (result) {
    return unexcused ? !result.done : true;
  } else {
    return false;
  }
}

export function absenceExcused({ type }: Absence): boolean {
  return type !== AbsenceTypes.UNENTSCHULDIGT && type !== AbsenceTypes.ABGELAUFEN;
}
