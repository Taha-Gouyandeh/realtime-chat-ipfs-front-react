import { getLocalItems } from '../../hooks';
import { languageStoreType } from './type';

const language = getLocalItems('language');

export const initialState: languageStoreType = {
  value: language === 'fa' ? 'fa' : 'en',
};
