import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { darkModeStoreType } from './type';
import { eraseCookie, setLocalItems } from '../../hooks';

export const DarkModeSlice = createSlice({
  initialState: initialState,
  name: 'darkMode',
  reducers: {
    setDarkMode: (state: darkModeStoreType, action: PayloadAction<boolean>) => {
      eraseCookie('darkMode');
      setLocalItems('darkMode', String(action.payload));
      state.value = action.payload;
    },
  },
});

export const { setDarkMode } = DarkModeSlice.actions;
export const DarkModeReducer = DarkModeSlice.reducer;
