import { ContentType, UserType } from '../../DTO';
import { Api } from '../api';

export const PdfUploader = (user: UserType, formData: any) => {
  return new Promise<{ attachment: any }>((resolve, reject) => {
    const api = new Api({
      method: 'post',
      path: 'admin/upload',
      header: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    return api
      .call()
      .then((data: any) =>
        resolve({ attachment: convertContentToContentType(data.data) }),
      )
      .catch((err) => reject(err.data.message));
  });
};

export const convertContentToContentType = (data: any): ContentType => {
  let out: ContentType = {
    id: data?.id,
    path: data?.path,
    url: `${process.env.REACT_APP_FILE_BASE_URL}${data?.path}`,
  };

  return out;
};
