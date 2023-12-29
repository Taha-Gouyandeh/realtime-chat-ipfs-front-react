import { RootState } from '../../state';

export const selectDarkMode = (state: RootState) => state.showDarkMode.value;
