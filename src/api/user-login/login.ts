import { UserType } from '../../DTO';
import { Api } from '../api';

export const FetchUserLogin = (username: string, password: string) => {
  return new Promise<{ data: UserType }>((resolve, reject) => {
    const api = new Api({
      method: 'post',
      path: 'user/login',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      header: {
        'Content-Type': 'application/json',
      },
    });
    return api
      .call()
      .then((data: any) => {
        return resolve({
          data: convertToUserType(data.data),
        });
      })
      .catch((err: any) => {
        return reject(err.message);
      });
  });
};

export function convertToUserType(data: any): UserType {
  return {
    id: data?.user?.id,
    accessToken: data?.accessToken,
    username: data?.user?.username,
  };
}

export const UserRegister = (username: string, password: string) => {
  return new Promise<{ data: any }>((resolve, reject) => {
    const api = new Api({
      method: 'post',
      path: 'user',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      header: {
        'Content-Type': 'application/json',
      },
    });
    return api
      .call()
      .then((data: any) => {
        return resolve({
          data: data.data,
        });
      })
      .catch((err: any) => {
        return reject(err.message);
      });
  });
};
