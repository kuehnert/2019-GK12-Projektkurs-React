import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';

const store = configureStore({ reducer: rootReducer });

// Hot reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction;

export default store;
