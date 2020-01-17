import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';
import { Student } from './studentSlice';

export interface Enrolment extends EnrolmentBase {
  id: string;
  active: boolean;
  writesExams: boolean;
  absenceCount: number;
  absences: Absence[];
  missingHomeworkCount: number;
  missingHomework: MissingHomework[];
  finalGradePoints: number;
  student: Student;
}

export interface EnrolmentBase {
  studentId: string;
  courseId: string;
}

export interface Absence {
  date: Date;
  type: AbesenceTypes;
  lessons: number;
  minutes: number;
  done: boolean;
}

enum AbesenceTypes {
  UNENTSCHULDIGT = 'Unentschuldigt',
  ENTSCHULDIGT = 'Entschuldigt',
  SCHULISCH = 'Schulisch',
}

export interface MissingHomework {
  date: Date;
  reason: string;
  done: boolean;
  weight: number;
}

export interface EnrolmentState {
  enrolments: { [courseId: string]: Enrolment[] };
  isRequesting: boolean;
  error: string | null;
}

const initialState: EnrolmentState = {
  enrolments: {},
  isRequesting: false,
  error: null,
};

export const EnrolmentSlice = createSlice({
  name: 'enrolments',
  initialState,
  reducers: {
    createEnrolmentsSuccess(state, action: PayloadAction<{ courseId: string; newEnrolments: Enrolment[] }>) {
      const { courseId, newEnrolments } = action.payload;
      let enrolments = state.enrolments[courseId] || [];
      state.enrolments[courseId] = [...enrolments, ...newEnrolments];
    },
    createEnrolmentsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { createEnrolmentsSuccess, createEnrolmentsFailed } = EnrolmentSlice.actions;

export default EnrolmentSlice.reducer;

export const createEnrolments = (termId: string, courseId: string, studentIds: string[]): AppThunk => async (
  dispatch,
  getState
) => {
  let newEnrolments;
  let values = studentIds.map(id => ({ studentId: id }));

  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.post(
      `/teachers/${teacherId}/terms/${termId}/courses/${courseId}/enrolments`,
      values,
      {
        headers: authHeader(),
      }
    );

    newEnrolments = result.data;
  } catch (error) {
    dispatch(createEnrolmentsFailed(error.toString()));
    return;
  }

  dispatch(createEnrolmentsSuccess({ courseId, newEnrolments }));
};
