import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';
import { Enrolment } from '../enrolments/enrolmentSlice';

export interface Course extends CourseBase {
  id: string;
  enrolments: Enrolment[];
  logEntries: LogEntry[];
}

export interface LogEntry {
  id: string;
  number: number;
  date: Date;
  plan: string;
  homework: string;
  notes: string;
  lessons: number;
  cancelled: boolean;
  done: boolean;
}

export const defaultLogEntry = {
  id: "dummy",
  number: -1,
  date: new Date(),
  plan: "",
  homework: "",
  notes: "",
  lessons: 0,
  cancelled: false,
  done: false,
}

export interface CourseBase {
  termId: string;
  name: string;
  year: number;
  end: Date;
  logCourse: boolean;
  logAbsences: boolean;
  logHomework: boolean;
}

export const defaultCourse: Course = {
  id: 'dummy',
  termId: 'dummy',
  end: new Date(),
  name: 'Unbenannt',
  year: 5,
  logAbsences: true,
  logCourse: true,
  logHomework: true,
  enrolments: [],
  logEntries: [],
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
    getCourseSuccess(state, action: PayloadAction<{ termId: string; course: Course }>) {
      const { termId, course } = action.payload;
      const courses = state.courses[termId] || [];
      const index = courses.findIndex(c => c.id === course.id);

      if (index > -1) {
        courses[index] = course;
      } else {
        courses.push(course);
      }

      state.courses[termId] = courses;
    },
    getCourseFailed(state, action: PayloadAction<string>) {
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
      let courses = state.courses[termId];
      const index = courses.findIndex(c => c.id === course.id);
      courses[index] = course;
      courses = courses.sort((a, b) => a.name.localeCompare(b.name));
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
  getCourseFailed,
  getCourseSuccess,
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

export const getCourse = (termId: string, courseId: string): AppThunk => async dispatch => {
  let course;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(`/teachers/${teacherId}/terms/${termId}/courses/${courseId}`, { headers: authHeader() });
    course = result.data;
  } catch (error) {
    dispatch(getCourseFailed(error.toString()));
    return;
  }

  dispatch(getCourseSuccess({ termId, course }));
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
