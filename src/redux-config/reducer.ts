import { combineReducers } from '@reduxjs/toolkit';
import { UserReducer } from './entities/user/slice';
import { DarkModeReducer } from './entities/dark-mode';
import { LanguageReducer } from './entities/language';

export const RootReducers = combineReducers({
  user: UserReducer,
  showDarkMode: DarkModeReducer,
  showLanguage: LanguageReducer,
});
