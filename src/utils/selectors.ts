// import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Course } from '../features/courses/courseSlice';
import { Term } from '../features/terms/termSlice';

// export const useCourse: Course | undefined = (courseId: string) => {
export const useCourse = (termId: string, courseId: string): Course | undefined => {
  return useSelector((state: RootState) => state.courses.courses[termId]?.find(c => c.id === courseId));
};

export const useTerm = (termId: string): Term | undefined => {
  return useSelector((state: RootState) => state.terms.terms?.find((term: Term) => term.id === termId));
};
