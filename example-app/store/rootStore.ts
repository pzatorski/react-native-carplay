import { configureStore } from '@reduxjs/toolkit';
import speedometerReducer from './speedometerReducer';
// ...

export const store = configureStore({
  reducer: {
    speedometer: speedometerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
