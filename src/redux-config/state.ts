import { darkModeStoreType } from './entities/dark-mode';
import { languageStoreType } from './entities/language';
import { userStoreType } from './entities/user';

export type RootState = {
  user: userStoreType;
  showDarkMode: darkModeStoreType;
  showLanguage: languageStoreType;
};
