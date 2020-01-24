// import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/rootReducer';
import { Course } from '../features/courses/courseSlice';
import { Teacher } from '../features/teachers/teacherSlice';
import { Term } from '../features/terms/termSlice';

const pathPattern = /terms\/(\w+)(\/courses\/(\w+))?/;

export const useTeacher = (): Teacher | null => {
  return useSelector((state: RootState) => state.teachers.teacher);
};

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
};

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current != null) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
