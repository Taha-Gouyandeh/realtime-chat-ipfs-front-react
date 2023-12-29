import React, { useEffect, useRef, useState } from 'react';
import { ContentUpload } from './content_upload';
import { ContentType } from '../../DTO';
import { FileText, PlusIcon, X } from 'lucide-react';
import AudioPlayer from '../audio-player';
import { useTranslation } from 'react-i18next';

export const Contents = (props: {
  formPrefix: string;
  setContents: Function;
  initialContents: ContentType[];
  type: 'sound' | 'image' | 'video' | 'pdf';
  maxSize: number;
  disabled: boolean;
}) => {
  const { setContents, formPrefix, disabled, initialContents, type, maxSize } =
    props;

  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<ContentType[]>([]);
  const [disable, setDisable] = useState<boolean>(disabled);

  const { t } = useTranslation();

  useEffect(() => {
    setUploadedFiles(initialContents);
  }, [initialContents]);

  // useEffect(() => {
  //   setContents(uploadedFiles);
  // }, [uploadedFiles]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (e.target.files[0].size < 200000000) {
      setError('');
      const contentFile = e.target.files[0];
      if (!checkIsNotRepeat(contentFile)) {
        setSelectedFile([...selectedFile, contentFile]);
      }
    } else {
      setError(String(t('contentSizeError')));
    }
  };

  const checkIsNotRepeat = (file: File): boolean => {
    let isRepeat = false;
    selectedFile.forEach((element) => {
      if (element == file) {
        isRepeat = true;
        return true;
      }
    });
    return isRepeat;
  };

  const handleDeletedFile = (file: File) => {
    setSelectedFile([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="d-flex flex-row flex-wrap col-12">
      <div className="col-12 ">
        <input
          id={`inputContents${formPrefix}`}
          className="d-none"
          aria-label="Contents"
          type="file"
          name={`Contents${formPrefix}`}
          title=" "
          accept={
            type == 'video'
              ? 'video/*'
              : type == 'image'
                ? 'image/*'
                : type == 'pdf'
                  ? 'application/pdf'
                  : 'audio/*'
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSelectFile(e);
          }}
          ref={fileInputRef}
          // isInvalid={error != ""}
          disabled={disable}
        ></input>

        <div className="p-1 d-flex flex-row flex-wrap my-2">
          <label
            style={{
              cursor: 'pointer',
              height: '150px',
              width: '250px',
              border: '1px solid #A4A4A9',
            }}
            htmlFor={`inputContents${formPrefix}`}
            className={`bg-custom-light rounded-4 flex-column justify-content-center align-items-center contents-upload ${
              selectedFile.length >= maxSize || uploadedFiles.length >= maxSize
                ? 'd-none'
                : 'd-flex'
            }`}
          >
            <div className="d-flex justify-content-center align-items-center">
              <PlusIcon />
            </div>
            <small
              className={'text-center text3 mt-3'}
              style={{ fontSize: '14px' }}
            >
              {String(t('contentTitle'))}
            </small>
          </label>
          {selectedFile.map((item, index) => (
            <ContentUpload
              setDisable={setDisable}
              key={index}
              type={type}
              contentFile={item}
              getDataFromServer={(data: ContentType, file: File) => {
                handleDeletedFile(file);
                setUploadedFiles([...uploadedFiles, data]);
                setContents([...uploadedFiles, data]);
              }}
            />
          ))}
          {uploadedFiles.map((item, index) => (
            <ContentItemView
              content={item}
              key={index}
              type={type}
              handleDeletedContent={(id: string) => {
                const list: ContentType[] = [];
                uploadedFiles.forEach((element) => {
                  if (Number(element.id) !== Number(id)) {
                    list.push(element);
                  }
                });
                setUploadedFiles(list);
                setContents(list);
              }}
            />
          ))}
        </div>
        {error != '' ? <span>{error}</span> : <></>}
        {/*<Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>*/}
      </div>
    </div>
  );
};

const ContentItemView: React.FC<{
  content: ContentType;
  key: number;
  handleDeletedContent: Function;
  type: 'sound' | 'image' | 'video' | 'pdf';
}> = ({ content, key, handleDeletedContent, type }) => {
  return (
    <div
      key={key}
      className="my-2 my-md-0 mx-md-2 position-relative overflow-hidden rounded-4"
      style={{ border: '1px solid #A4A4A9' }}
    >
      <span
        onClick={() => handleDeletedContent(content.id)}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 20,
          cursor: 'pointer',
        }}
      >
        <X className="text-danger" />
      </span>
      {content.url ? (
        <>
          {type == 'video' ? (
            <video width="240" height="140" controls>
              <source src={content.url} />
            </video>
          ) : type == 'image' ? (
            <img
              className="rounded-4 mx-2"
              width={240}
              height={140}
              src={content.url}
              alt={'image uploaded'}
            />
          ) : type == 'pdf' ? (
            <FileText
              className="g-cursor-pointer"
              onClick={() => window.open(content.url, 'blank')}
              style={{ width: '240px', height: '140px' }}
            />
          ) : (
            <>
              <AudioPlayer src={content.url} />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
