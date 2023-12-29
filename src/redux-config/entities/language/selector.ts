import { RootState } from '../../state';

export const selectLanguage = (state: RootState) => state.showLanguage.value;
