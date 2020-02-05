import { combineReducers } from '@reduxjs/toolkit';

import charactersReducer from '../features/characters/characterSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
});

export default rootReducer;
