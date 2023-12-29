import { UserType } from '../../../DTO';
import { getLocalItems } from '../../hooks';
import { userStoreType } from './type';

let user: UserType = {
  id: '',
  accessToken: '',
  username: '',
};

if (
  JSON.parse(getLocalItems('user') + '') != null &&
  JSON.parse(getLocalItems('user') + '') != ''
) {
  user = JSON.parse(getLocalItems('user') + '');
}

export const initialState: userStoreType = {
  value: user,
  status: 'idle',
};
