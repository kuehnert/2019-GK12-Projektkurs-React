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
    createStudentsForCourseSuccess(state, action: PayloadAction<{ termId: string; students: Student[] }>) {
      // const { termId, course } = action.payload;
      // state.courses[termId].push(course);
    },
    createStudentsForCourseFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { createStudentsForCourseFailed, createStudentsForCourseSuccess } = studentSlice.actions;

export default studentSlice.reducer;

export const createStudentsForCourse = (
  termId: string,
  courseId: string,
  values: StudentBase[]
): AppThunk => async dispatch => {
  let students;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.post(
      `/teachers/${teacherId}/terms/${termId}/courses/${courseId}/students`,
      values,
      {
        headers: authHeader(),
      }
    );
    students = result.data;
  } catch (error) {
    dispatch(createStudentsForCourseFailed(error.toString()));
    return;
  }

  dispatch(createStudentsForCourseSuccess({termId, students}));
};
