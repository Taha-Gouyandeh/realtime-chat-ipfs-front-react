import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux-config/hooks';
import { selectUser } from '../../redux-config/entities/user/selector';
import { CustomBreadCrumb } from '../../components/customBreadCrumb';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { ChatApi } from '../../api';
import { ChatType } from '../../DTO/chat';

export const HistoryInfo = () => {
  const user = useAppSelector(selectUser);

  const { id } = useParams();

  const { t } = useTranslation();

  const crumbs = [{ name: t('Chat-room'), href: '#' }];

  const [messages, setMessages] = useState<ChatType[]>([]);

  useEffect(() => {
    ChatApi.GetChatList(user, id + '').then((data) => {
      console.log(data.data);
      setMessages(data.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('ChatRoom')} </title>
        <meta name="description" content="Basic example" />
      </Helmet>
      <div className="d-flex flex-column container" dir={'ltr'}>
        <div
          className={
            'w-100 bg-custom-white p-2 d-flex flex-row shadow justify-content-between align-items-center'
          }
          style={{ zIndex: 5 }}
        >
          <span>{t('chat-room')}</span>
        </div>
        <div
          className={
            'd-flex flex-column-reverse overflow-y-auto chat-height bg-custom-white mb-2 rounded-bottom-4 position-relative'
          }
        >
          {messages.map((item, index) => (
            <div className={'d-flex flex-row mx-2'} key={index}>
              <span
                className={`d-flex flex-column my-2 prm5-bg p-3 text-break ${
                  user.id == item.userId
                    ? 'chat-item-you ms-auto'
                    : 'chat-item-other '
                }`}
              >
                <small
                  className={`text3 ${
                    user.id == item.userId ? ' ms-auto' : ''
                  }`}
                >
                  {`${user.id == item.userId ? ' :' : ''}`}
                  {item.username}
                  {`${user.id == item.userId ? ' ' : ':'}`}
                </small>
                <span className={'text1'}>{item.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
