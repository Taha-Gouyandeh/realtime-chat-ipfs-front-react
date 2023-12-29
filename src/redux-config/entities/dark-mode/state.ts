import { getLocalItems } from '../../hooks';
import { darkModeStoreType } from './type';

const darkMode = getLocalItems('darkMode');

export const initialState: darkModeStoreType = {
  value:
    darkMode == '' || darkMode == 'false' || darkMode == null ? false : true,
};
