import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState as RootState1 } from './state';
import { RootReducers } from './reducer';

export const store = configureStore({
  reducer: RootReducers,
});

export type RootState = RootState1;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
