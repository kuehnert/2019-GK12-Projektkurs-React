// import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Course } from '../features/courses/courseSlice';
import { Term } from '../features/terms/termSlice';
import { useLocation } from "react-router-dom";

const pathPattern = /terms\/(\w+)(\/courses\/(\w+))?/;

// export const useCourse: Course | undefined = (courseId: string) => {
export const useCourse = (termId: string, courseId: string): Course | undefined => {
  return useSelector((state: RootState) => state.courses.courses[termId]?.find(c => c.id === courseId));
};

export const useTerm = (termId: string): Term | undefined => {
  return useSelector((state: RootState) => state.terms.terms?.find((term: Term) => term.id === termId));
};

export const useTermParams = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, termId, __, courseId] = pathPattern.exec(pathname) || [];
  return { termId, courseId };
}
