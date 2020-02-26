import { combineReducers } from '@reduxjs/toolkit';

import charactersReducer from '../features/characters/characterSlice';
import logReducer from '../features/log/logSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
  log: logReducer
});

export default rootReducer;
