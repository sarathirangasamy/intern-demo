import { configureStore } from '@reduxjs/toolkit';
import sessionLoginReducer from './sessionUserReducer';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    userAuth: sessionLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
