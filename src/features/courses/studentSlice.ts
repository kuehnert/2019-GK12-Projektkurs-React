import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';

export interface Student extends StudentBase {
  id: string;
}

export interface StudentBase {
  firstname: string;
  lastname: string;
  year: number;
  formGroup: string;
  sex: number;
  phone?: string;
  email?: string;
  dob?: Date;
}

export interface StudentState {
  students: { [termId: string]: Student[] };
  isRequesting: Boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: {},
  isRequesting: false,
  error: null,
};

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    getTermStudentsSuccess(state, action: PayloadAction<{ termId: string; students: Student[] }>) {
      const { termId, students } = action.payload;
      state.students[termId] = students;
    },
    getTermStudentsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    createStudentsForCourseSuccess(state, action: PayloadAction<{ termId: string; students: Student[] }>) {
      const { termId, students } = action.payload;
      state.students[termId] = (state.students[termId] || []).concat(students);
    },
    createStudentsForCourseFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { createStudentsForCourseFailed, createStudentsForCourseSuccess, getTermStudentsFailed, getTermStudentsSuccess } = studentSlice.actions;

export default studentSlice.reducer;

export const getTermStudents = (termId: string): AppThunk => async dispatch => {
  let students;

  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(`/teachers/${teacherId}/terms/${termId}/students`, { headers: authHeader() });
    students = result.data;
  } catch (error) {
    dispatch(getTermStudentsFailed(error.toString()));
    return;
  }

  dispatch(getTermStudentsSuccess({ termId, students }));
};

export const createStudentsForCourse = (
  termId: string,
  courseId: string,
  values: StudentBase[]
): AppThunk => async dispatch => {
  let students;

  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.post(`/teachers/${teacherId}/terms/${termId}/students`, values, {
      headers: authHeader(),
    });
    students = result.data;
  } catch (error) {
    dispatch(createStudentsForCourseFailed(error.toString()));
    return;
  }

  dispatch(createStudentsForCourseSuccess({ termId, students }));
};
