import { createSlice } from '@reduxjs/toolkit';
import starwarsApi from '../../api/starwarsApi';

const initialState = { list: null, isRequesting: false, error: null };

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosSuccess(state, action) {
      console.log('action', action);
      state.list = action.payload;
      state.error = null;
    },
    getTodosFailed(state, action) {
      console.log('action', action);
      state.error = action.payload;
    },
  },
});

export const { getTodosSuccess, getTodosFailed } = todoSlice.actions;

export default todoSlice.reducer;

export const getTodos = () => async dispatch => {
  console.log('getTodos');
  let list;
  try {
    const result = await starwarsApi.get(`/people`);
    list = result.data;
  } catch (error) {
    dispatch(getTodosFailed(error.toString()));
    return;
  }

  dispatch(getTodosSuccess(list));
};
