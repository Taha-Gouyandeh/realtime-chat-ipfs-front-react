import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux-config/hooks';
import { selectUser } from '../../redux-config/entities/user/selector';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { ChatApi } from '../../api';
import { ChatHashType } from '../../DTO/chat';

export const History = () => {
  const user = useAppSelector(selectUser);

  const { t } = useTranslation();

  const [messages, setMessages] = useState<ChatHashType[]>([]);

  useEffect(() => {
    ChatApi.GetChatHashList(user).then((data) => {
      setMessages(data.data);
    });
  }, []);
  console.log(messages);
  return (
    <>
      <Helmet>
        <title>{t('ChatRoom')} </title>
        <meta name="description" content="Basic example" />
      </Helmet>
      <div className="d-flex flex-column container" dir={'ltr'}>
        <div className={'bg-custom-white d-flex flex-column rounded-4 p-2'}>
          {messages.map((item, index) => (
            <div className={'d-flex flex-row justify-content-center'}>
              <Link
                to={`/history/${item.id}`}
                key={index}
                className={'p-2 m-2 prm4-bg rounded-4'}
              >
                <span>{item.created_at}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
