import { UserType } from '../../DTO';
import { Api } from '../api';
import { ChatHashType, ChatType } from '../../DTO/chat';

export const StoreChat = (user: UserType, data: any[]) => {
  return new Promise<{ data: UserType }>((resolve, reject) => {
    const api = new Api({
      method: 'post',
      path: 'chat',
      body: JSON.stringify({
        message: data,
      }),
      header: {
        Authorization: 'Bearer ' + user?.accessToken,
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

export const GetChatHashList = (user: UserType) => {
  return new Promise<{ data: ChatHashType[] }>((resolve, reject) => {
    const api = new Api({
      method: 'get',
      path: 'chat',
      header: {
        Authorization: 'Bearer ' + user?.accessToken,
        'Content-Type': 'application/json',
      },
    });
    return api
      .call()
      .then((data: any) => {
        return resolve({
          data: convertToHashListType(data.data),
        });
      })
      .catch((err: any) => {
        return reject(err.message);
      });
  });
};
export function convertToHashListType(data: any[]): ChatHashType[] {
  return data.map((item) => convertToHashType(item));
}

export function convertToHashType(item: any): ChatHashType {
  return {
    id: item.id,
    ipfsId: item.ipfsId,
    created_at: item.created_at,
  };
}
export const GetChatList = (user: UserType, id: string) => {
  return new Promise<{ data: ChatType[] }>((resolve, reject) => {
    const api = new Api({
      method: 'get',
      path: `chat/${id}`,
      header: {
        Authorization: 'Bearer ' + user?.accessToken,
        'Content-Type': 'application/json',
      },
    });
    return api
      .call()
      .then((data: any) => {
        return resolve({
          data: convertToMessageListType(data),
        });
      })
      .catch((err: any) => {
        return reject(err.message);
      });
  });
};

export function convertToMessageListType(data: any[]): ChatType[] {
  return data.map((item) => convertToMessageType(item));
}

export function convertToMessageType(item: any): ChatType {
  return {
    username: item.username,
    userId: item.userId,
    text: item.text,
  };
}
