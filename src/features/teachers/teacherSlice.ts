import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Term } from '../terms/termSlice';
import sokratesApi from '../../apis/sokratesApi';
import authHeader from '../../utils/authHeader';
import { AppThunk } from '../../app/store';

export const states = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen-Anhalt',
  'Sachsen',
  'Schleswig-Holstein',
  'Thüringen',
];

export interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  schoolName: string;
  state: string;
  email: string;
  terms: Term[];
  sortByLastname?: boolean;
}

export interface SignUpValues {
  firstname: string;
  lastname: string;
  schoolName: string;
  state: string;
  email: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export const defaultTeacher = {
  id: '',
  firstname: '',
  lastname: '',
  schoolName: '',
  email: '',
  sortByLastname: true,
  state: 'Niedersachsen',
  terms: Array<Term>(),
};

export interface TeacherState {
  isLoggedIn: boolean;
  isRequesting: boolean;
  teacher: Teacher | null;
  error: string | null;
}

// TODO: check token
// const token = JSON.parse(localStorage.getItem('token'));
const storedTeacher = localStorage.getItem('teacher');
let teacher = null;
try {
  teacher = storedTeacher != null ? JSON.parse(storedTeacher) : null;
} catch (error) {
  localStorage.removeItem('teacher');
  localStorage.removeItem('token');
  teacher = null;
}

const initialState: TeacherState = {
  isLoggedIn: teacher == null ? false : true,
  isRequesting: false,
  teacher,
  error: null,
};

const teacherSlice = createSlice({
  name: 'currentTeacher',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Teacher>) {
      state.teacher = action.payload;
      state.isLoggedIn = action.payload != null;
      state.error = null;
      state.isRequesting = false;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.teacher = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isRequesting = false;
    },
    signUpSuccess(state, action: PayloadAction<Teacher>) {
      state.teacher = action.payload;
      state.isLoggedIn = action.payload != null;
      state.error = null;
      state.isRequesting = false;
    },
    signUpFailed(state, action: PayloadAction<string>) {
      state.teacher = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isRequesting = false;
    },
    logoutSuccess(state, action: PayloadAction) {
      state.teacher = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isRequesting = false;
    },
    logoutFailed(state, action: PayloadAction<string>) {
      state.teacher = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isRequesting = false;
    },
    updateTeacherSuccess(state, action: PayloadAction<Teacher>) {
      state.teacher = action.payload;
      state.error = null;
    },
    updateTeacherFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isRequesting = false;
    },
    submitting(state, action: PayloadAction) {
      state.isRequesting = true;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  submitting,
  loginFailed,
  logoutFailed,
  signUpFailed,
  signUpSuccess,
  updateTeacherFailed,
  updateTeacherSuccess,
} = teacherSlice.actions;

export default teacherSlice.reducer;

export const login = (values: LoginValues): AppThunk => async dispatch => {
  dispatch(submitting());
  let teacher, token;
  try {
    const response = await sokratesApi.post('/teachers/login', values);
    teacher = response.data.teacher;
    token = response.data.token;

    localStorage.setItem('teacher', JSON.stringify(teacher));
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch(loginFailed(error.toString()));
    return;
  }

  dispatch(loginSuccess(teacher));
};

export const logout = (): AppThunk => async dispatch => {
  try {
    await sokratesApi.post('/teachers/logout', null, { headers: authHeader() });
  } catch (error) {
    dispatch(logoutFailed(error.toString()));
    return;
  } finally {
    localStorage.removeItem('teacher');
    localStorage.removeItem('token');
  }

  dispatch(logoutSuccess());
};

export const signUp = (values: SignUpValues): AppThunk => async dispatch => {
  dispatch(submitting());
  let teacher, token;

  try {
    const response = await sokratesApi.post('/teachers', values);
    teacher = response.data.teacher;
    token = response.data.token;

    localStorage.setItem('teacher', JSON.stringify(teacher));
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch(signUpFailed(error.toString()));
    return;
  }

  dispatch(signUpSuccess(teacher));
};

export const updateTeacher = (values: Teacher): AppThunk => async dispatch => {
  dispatch(submitting());
  let teacher;

  try {
    const response = await sokratesApi.patch(`/teachers/${values.id}`, values, {
      headers: authHeader(),
    });
    teacher = response.data;
    localStorage.setItem('teacher', JSON.stringify(teacher));
  } catch (error) {
    dispatch(updateTeacherFailed(error.toString()));
    return;
  }

  dispatch(updateTeacherSuccess(teacher));
};
