import { createSlice } from '@reduxjs/toolkit';
import starwarsApi from '../../api/starwarsApi';

const initialState = { list: null, isRequesting: false, error: null };

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharactersSuccess(state, action) {
      console.log('action', action);
      state.list = action.payload;
      state.error = null;
    },
    getCharactersFailed(state, action) {
      console.log('action', action);
      state.error = action.payload;
    },
  },
});

export const { getCharactersSuccess, getCharactersFailed } = characterSlice.actions;

export default characterSlice.reducer;

export const getCharacters = () => async dispatch => {
  console.log('getCharacters');
  let list;
  try {
    const result = await starwarsApi.get(`/people`);
    list = result.data;
  } catch (error) {
    dispatch(getCharactersFailed(error.toString()));
    return;
  }

  dispatch(getCharactersSuccess(list));
};
