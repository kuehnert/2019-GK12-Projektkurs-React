import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';

export interface Enrolment {
  studentId: string;
}

export interface Lesson {
  // id: string;
  courseId: string;
  weekday: number;
  period: number;
  room?: string;
}

export interface Course extends CourseBase {
  id: string;
}

export interface CourseBase {
  termId: string;
  name: string;
  year: number;
  endDate: Date;
  logCourse: boolean;
  logAbsences: boolean;
  logHomework: boolean;
  enrolments: Enrolment[];
  lessons: Lesson[];
}

export const defaultCourse: Course = {
  id: 'dummy',
  termId: 'dummy',
  endDate: new Date(),
  name: 'Unbenannt',
  year: 5,
  logAbsences: true,
  logCourse: true,
  logHomework: true,
  enrolments: [],
  lessons: [],
};

export interface CourseState {
  courses: { [termId: string]: Course[] };
  isRequesting: Boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: {},
  isRequesting: false,
  error: null,
};

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCoursesSuccess(state, action: PayloadAction<{ termId: string; courses: Course[] }>) {
      const { termId, courses } = action.payload;
      state.courses[termId] = courses;
    },
    getCoursesFailed(state, action: PayloadAction<string>) {
      state.courses = {};
      state.error = action.payload;
    },
    createCourseSuccess(state, action: PayloadAction<{ termId: string; course: Course }>) {
      const { termId, course } = action.payload;
      state.courses[termId].push(course);
    },
    createCourseFailed(state, action: PayloadAction<string>) {
      state.courses = {};
      state.error = action.payload;
    },
    updateCourseSuccess(state, action: PayloadAction<{ termId: string; course: Course }>) {
      const { termId, course } = action.payload;
      const courses = state.courses[termId];
      const index = courses.findIndex(c => c.id === course.id);
      courses[index] = course;
    },
    updateCourseFailed(state, action: PayloadAction<string>) {
      state.courses = {};
      state.error = action.payload;
    },
    deleteCourseSuccess(state, action: PayloadAction<{ termId: string; course: Course }>) {
      const { termId, course } = action.payload;
      state.courses[termId] = state.courses[termId].filter(c => c.id !== course.id);
    },
    deleteCourseFailed(state, action: PayloadAction<string>) {
      state.courses = {};
      state.error = action.payload;
    },
  },
});

export const {
  createCourseSuccess,
  createCourseFailed,
  getCoursesSuccess,
  getCoursesFailed,
  updateCourseFailed,
  updateCourseSuccess,
  deleteCourseFailed,
  deleteCourseSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;

export const getCourses = (termId: string): AppThunk => async dispatch => {
  let courses;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(`/teachers/${teacherId}/terms/${termId}/courses`, { headers: authHeader() });
    courses = result.data;
  } catch (error) {
    dispatch(getCoursesFailed(error.toString()));
    return;
  }

  dispatch(getCoursesSuccess({ termId, courses }));
};

export const createCourse = (termId: string, values: CourseBase): AppThunk => async dispatch => {
  let course;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.post(`/teachers/${teacherId}/terms/${termId}/courses`, values, {
      headers: authHeader(),
    });
    course = result.data;
  } catch (error) {
    dispatch(createCourseFailed(error.toString()));
    return;
  }

  dispatch(createCourseSuccess({ termId, course }));
};

export const updateCourse = (termId: string, values: Course): AppThunk => async dispatch => {
  let course;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.patch(`/teachers/${teacherId}/terms/${termId}/courses/${values.id}`, values, {
      headers: authHeader(),
    });
    course = result.data;
  } catch (error) {
    dispatch(updateCourseFailed(error.toString()));
    return;
  }

  dispatch(updateCourseSuccess({ termId, course }));
};

export const deleteCourse = (termId: string, courseId: string): AppThunk => async dispatch => {
  let course;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.delete(`/teachers/${teacherId}/terms/${termId}/courses/${courseId}`, {
      headers: authHeader(),
    });
    course = result.data;
  } catch (error) {
    dispatch(deleteCourseFailed(error.toString()));
    return;
  }

  dispatch(deleteCourseSuccess({ termId, course }));
};
