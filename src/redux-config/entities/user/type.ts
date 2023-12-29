import { UserType } from '../../../DTO';

export type userStoreType = {
  value: UserType;
  status: 'idle' | 'loading' | 'failed' | 'auth' | 'unAuth';
};
