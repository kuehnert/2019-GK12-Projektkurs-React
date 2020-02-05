import { combineReducers } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/TodoSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
