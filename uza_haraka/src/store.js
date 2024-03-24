import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk';
import rootReducer from './reducer/index';

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
