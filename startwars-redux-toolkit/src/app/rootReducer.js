import { combineReducers } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/todoSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
