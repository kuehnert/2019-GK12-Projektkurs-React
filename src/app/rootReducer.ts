import { combineReducers } from '@reduxjs/toolkit';

import coursesReducer from '../features/courses/courseSlice';
import teachersReducer from '../features/teachers/teacherSlice';
import termsReducer from '../features/terms/termSlice'

const rootReducer = combineReducers({
  courses: coursesReducer,
  teachers: teachersReducer,
  terms: termsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
