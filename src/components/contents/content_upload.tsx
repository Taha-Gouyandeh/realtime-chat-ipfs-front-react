import React, { FC, useEffect, useState } from 'react';
import './style.scss';
import { useAppSelector } from '../../redux-config/hooks';
import { selectUser } from '../../redux-config/entities/user';
import AudioPlayer from '../audio-player';
import { UploadApi } from '../../api';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ContentUpload: FC<{
  contentFile: File;
  getDataFromServer: Function;
  type: 'sound' | 'image' | 'video' | 'pdf';
  setDisable: Function;
}> = ({ contentFile, getDataFromServer, type, setDisable }) => {
  const [preview, setPreview] = useState<string>('');
  const [uploadLoader, setUploadLoader] = useState(false);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    createPreviews();
    uploadToApi();
  }, []);

  const createPreviews = () => {
    if (!contentFile) {
      setPreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(contentFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  const uploadToApi = () => {
    if (!uploadLoader) {
      setUploadLoader(true);
      setDisable(true);
      handleUploadFile();
    }
  };

  const handleUploadFile = () => {
    // if (type == 'image') {
    //   let formData = new FormData();
    //   formData.append('file', contentFile);
    //   UploadApi.ImageUploader(user, formData)
    //     .then((data) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //       getDataFromServer(data.data);
    //     })
    //     .catch((err) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //     });
    // } else if (type == 'video') {
    //   let formData = new FormData();
    //   formData.append('video', contentFile);
    //   UploadApi.VideoUploader(user, formData)
    //     .then((data) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //       getDataFromServer(data.data);
    //     })
    //     .catch((err) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //     });
    // } else if (type == 'sound'){
    //   let formData = new FormData();
    //   formData.append('audio', contentFile);
    //   UploadApi.AudioUploader(user, formData)
    //     .then((data) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //       getDataFromServer(data.data);
    //     })
    //     .catch((err) => {
    //       setUploadLoader(false);
    //       setDisable(false);
    //     });
    // }else{
    let formData = new FormData();
    formData.append('attachment', contentFile);
    UploadApi.PdfUploader(user, formData)
      .then((data) => {
        setUploadLoader(false);
        setDisable(false);
        getDataFromServer(data.attachment);
      })
      .catch((err) => {
        setUploadLoader(false);
        setDisable(false);
      });
    // }
  };

  const { t } = useTranslation();

  return (
    <div
      className="my-2 my-md-0 mx-md-2 position-relative overflow-hidden rounded-4"
      style={{ border: '1px solid #A4A4A9' }}
    >
      {uploadLoader && (
        <div
          className="w-100 h-100 position-absolute text-white contents-upload-image d-flex justify-content-center align-items-center"
          style={{
            zIndex: 3,
          }}
        >
          <small>{t('uploading')}</small>
        </div>
      )}

      {preview ? (
        <>
          {type == 'video' ? (
            <video width="240" height="140" controls>
              <source src={preview + ''} />
            </video>
          ) : type == 'image' ? (
            <img
              className="rounded-4 mx-2"
              width={240}
              height={140}
              src={preview + ''}
              alt={'image uploaded'}
            />
          ) : type == 'pdf' ? (
            <FileText
              onClick={() => window.open(preview, 'blank')}
              className="g-cursor-pointer"
              style={{ width: '240px', height: '140px' }}
            />
          ) : (
            <>
              <AudioPlayer src={preview + ''} />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
