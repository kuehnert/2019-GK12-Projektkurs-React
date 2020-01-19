import { Term } from '../features/terms/termSlice';
import { Course } from '../features/courses/courseSlice';
import { getDay } from 'date-fns';

export interface Props {
  term: Term;
  course: Course;
  date: Date;
}

export function getLessons({ term, course, date }: Props): number {
  const wday = (getDay(date) + 6) % 7;

  return term.lessons.filter(l => l.weekday === wday && l.courseId === course.id).length;
}
