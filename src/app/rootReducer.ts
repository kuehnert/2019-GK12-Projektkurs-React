import { combineReducers } from '@reduxjs/toolkit';

import coursesReducer from '../features/courses/courseSlice';
import studentsReducer from '../features/courses/studentSlice';
import teachersReducer from '../features/teachers/teacherSlice';
import termsReducer from '../features/terms/termSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  teachers: teachersReducer,
  students: studentsReducer,
  terms: termsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
