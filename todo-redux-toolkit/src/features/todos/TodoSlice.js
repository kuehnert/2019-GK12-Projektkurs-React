import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], isRequesting: false, error: null };

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosSuccess(state, action) {
      state.list = action.payload;
      state.error = null;
    },
    getTodosFailed(state, action) {
      state.error = action.payload;
    },
  },
});

export const { getTodosSuccess, getTodosFailed } = todoSlice.actions;

export default todoSlice.reducer;

export const getTerms = () => async dispatch => {
  let list;
  try {
    // const result = await api.get(`/todos`);
    // todos = result.data;
    list = [
      { title: 'Say hello', done: false },
      { title: 'Meh!', done: true },
    ];
  } catch (error) {
    dispatch(getTodosFailed(error.toString()));
    return;
  }

  dispatch(getTodosSuccess(list));
};
