import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sokratesApi from '../../apis/sokratesApi';
import { AppThunk } from '../../app/store';
import authHeader from '../../utils/authHeader';
import getTeacherId from '../../utils/getTeacherId';
import { Teacher } from '../teachers/teacherSlice';

export interface Term {
  id: string;
  name: string;
  start: Date;
  end: Date;
  teacher: Teacher;
  periods: Period[];
}

export interface TermState {
  terms: Term[];
  isRequesting: Boolean;
  error: string | null;
}

export interface Period {
  number: number;
  name: string;
  start: string;
  end: string;
}

// export interface PeriodState {
//   periods: { [termId: string]: Period[] };
// }

const initialState: TermState = { terms: [], isRequesting: false, error: null };

const termSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    getTermsSuccess(state, action: PayloadAction<Term[]>) {
      state.terms = action.payload;
      state.error = null;
    },
    getTermsFailed(state, action: PayloadAction<string>) {
      state.terms = [];
      state.error = action.payload;
    },
    getTermSuccess(state, action: PayloadAction<Term>) {
      const { terms } = state;
      const term = action.payload;
      const index = terms.findIndex((t: Term) => t.id === term.id);
      index > -1 ? (terms[index] = term) : terms.push(term);
    },
    getTermFailed(state, action: PayloadAction<string>) {
      state.terms = [];
      state.error = action.payload;
    },
    createTermSuccess(state, action: PayloadAction<Term>) {
      state.terms.unshift(action.payload);
    },
    createTermFailed(state, action: PayloadAction<string>) {
      state.terms = [];
      state.error = action.payload;
    },
    updateTermSuccess(state, action: PayloadAction<Term>) {
      const { terms } = state;
      const term = action.payload;
      const index = terms.findIndex((t: Term) => t.id === term.id);
      terms[index] = term;
    },
    updateTermFailed(state, action: PayloadAction<string>) {
      state.terms = [];
      state.error = action.payload;
    },
    deleteTermSuccess(state, action: PayloadAction<Term>) {
      state.terms = state.terms.filter(term => term.id !== action.payload.id);
    },
    deleteTermFailed(state, action: PayloadAction<string>) {
      state.terms = [];
      state.error = action.payload;
    },
  },
});

export const {
  getTermsSuccess,
  getTermsFailed,
  getTermSuccess,
  getTermFailed,
  createTermSuccess,
  createTermFailed,
  updateTermSuccess,
  updateTermFailed,
  deleteTermSuccess,
  deleteTermFailed,
} = termSlice.actions;

export default termSlice.reducer;

export const getTerms = (): AppThunk => async dispatch => {
  let terms;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(`/teachers/${teacherId}/terms`, { headers: authHeader() });
    terms = result.data;
  } catch (error) {
    dispatch(getTermsFailed(error.toString()));
    return;
  }

  dispatch(getTermsSuccess(terms));
};

export const getTerm = (termId: string): AppThunk => async dispatch => {
  let term;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.get(`/teachers/${teacherId}/terms/${termId}`, { headers: authHeader() });
    term = result.data;
  } catch (error) {
    dispatch(getTermFailed(error.toString()));
    return;
  }

  dispatch(getTermSuccess(term));
};

export const createTerm = (values: Term): AppThunk => async dispatch => {
  let term;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.post(`/teachers/${teacherId}/terms`, values, { headers: authHeader() });
    term = result.data;
  } catch (error) {
    dispatch(createTermFailed(error.toString()));
    return;
  }

  dispatch(createTermSuccess(term));
};

export const updateTerm = (values: Term): AppThunk => async dispatch => {
  let term;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.patch(`/teachers/${teacherId}/terms/${values.id}`, values, {
      headers: authHeader(),
    });
    term = result.data;
  } catch (error) {
    dispatch(updateTermFailed(error.toString()));
    return;
  }

  dispatch(updateTermSuccess(term));
};

export const deleteTerm = (termId: string): AppThunk => async dispatch => {
  let term;
  try {
    const teacherId = getTeacherId();
    const result = await sokratesApi.delete(`/teachers/${teacherId}/terms/${termId}`, {
      headers: authHeader(),
    });
    term = result.data;
  } catch (error) {
    dispatch(deleteTermFailed(error.toString()));
    return;
  }

  dispatch(deleteTermSuccess(term));
};
