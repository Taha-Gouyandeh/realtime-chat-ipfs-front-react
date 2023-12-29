import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { languageStoreType } from './type';
import { eraseCookie, setLocalItems } from '../../hooks';

export const LanguageSlice = createSlice({
  initialState: initialState,
  name: 'Language',
  reducers: {
    setLanguage: (state: languageStoreType, action: PayloadAction<string>) => {
      eraseCookie('language');
      setLocalItems('language', String(action.payload));
      state.value = action.payload;
    },
  },
});

export const { setLanguage } = LanguageSlice.actions;
export const LanguageReducer = LanguageSlice.reducer;
