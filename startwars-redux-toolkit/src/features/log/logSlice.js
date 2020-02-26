import { createSlice } from '@reduxjs/toolkit';

const initialState = { messages: ["1", "2", "3"], offset: 0 };

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
    appendMessage(state, action) {
      state.messages.unshift(action.payload);
    },
  },
});

export const { appendMessage, } = logSlice.actions;

export default logSlice.reducer;

export const getLatestMessages = (state) => state.log.messages.slice(state.log.offset, 9);
