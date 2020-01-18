import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';
import { Student } from './studentSlice';
import { Course } from './courseSlice';

export interface Enrolment extends EnrolmentBase {
  id: string;
  termId: string;
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

export const enrolmentSlice = createSlice({
  name: 'enrolments',
  initialState,
  reducers: {
    getEnrolmentsSuccess(state, action: PayloadAction<{ courseId: string; enrolments: Enrolment[] }>) {
      const { courseId, enrolments } = action.payload;
      state.enrolments[courseId] = enrolments;
    },
    getEnrolmentsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    createEnrolmentsSuccess(state, action: PayloadAction<{ courseId: string; newEnrolments: Enrolment[] }>) {
      const { courseId, newEnrolments } = action.payload;
      let enrolments = state.enrolments[courseId] || [];
      state.enrolments[courseId] = [...enrolments, ...newEnrolments];
    },
    createEnrolmentsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    deleteEnrolmentSuccess(state, action: PayloadAction<{ courseId: string; deletedEnrolment: Enrolment }>) {
      const { courseId, deletedEnrolment } = action.payload;
      let enrolments = state.enrolments[courseId] || [];
      state.enrolments[courseId] = enrolments.filter(e => e.id !== deletedEnrolment.id);
    },
    deleteEnrolmentFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  getEnrolmentsSuccess,
  getEnrolmentsFailed,
  createEnrolmentsSuccess,
  createEnrolmentsFailed,
  deleteEnrolmentSuccess,
  deleteEnrolmentFailed,
} = enrolmentSlice.actions;

export default enrolmentSlice.reducer;

export const getEnrolments = (course: Course): AppThunk => async dispatch => {
  let enrolments = [];

  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(
      `/teachers/${teacherId}/terms/${course.termId}/courses/${course.id}/enrolments`,
      {
        headers: authHeader(),
      }
    );
    enrolments = result.data;
  } catch (error) {
    dispatch(getEnrolmentsFailed(error.toString()));
    return;
  }

  dispatch(getEnrolmentsSuccess({ courseId: course.id, enrolments }));
};

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

export const deleteEnrolment = (enrolment: Enrolment): AppThunk => async (dispatch, getState) => {
  const teacherId = getTeacherId();
  const { termId, courseId, id } = enrolment;

  try {
    await sokratesApi.delete(`/teachers/${teacherId}/terms/${termId}/courses/${courseId}/enrolments/${id}`, {
      headers: authHeader(),
    });
  } catch (error) {
    dispatch(deleteEnrolmentFailed(error.toString()));
    return;
  }

  dispatch(deleteEnrolmentSuccess({ courseId, deletedEnrolment: enrolment }));
};
