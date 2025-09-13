import { configureStore } from '@reduxjs/toolkit';
import pointReducer from './pointSlice';

export const store = configureStore({
  reducer: {
    point: pointReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;