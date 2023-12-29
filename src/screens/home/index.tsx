import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux-config/hooks';
import { selectUser } from '../../redux-config/entities/user/selector';
import { CustomBreadCrumb } from '../../components/customBreadCrumb';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import './style.scss';
import { useTranslation } from 'react-i18next';
import io, { Socket } from 'socket.io-client';
import { Send } from 'lucide-react';

export const Home = () => {
  const user = useAppSelector(selectUser);

  const { id } = useParams();

  const { t } = useTranslation();

  const crumbs = [{ name: t('Chat-room'), href: '#' }];

  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<
    {
      username: string;
      userId: string;
      text: string;
    }[]
  >([]);
  const [sendMessage, setSendMessage] = useState<string>('');

  const send = (value: string) => {
    socket?.emit('message', {
      user_receiver: '0c5eb236-0b07-495c-8188-cf0defcadf78',
      text: value,
    });
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8005', {
      extraHeaders: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: {
    username: string;
    userId: string;
    text: string;
  }) => {
    setMessages([message, ...messages]);
  };

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => {
      socket?.off('message', messageListener);
    };
  }, [messageListener]);

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
          <button className={'btn red3-bg text-white rounded-3'}>
            <small>{t('store&exit')}</small>
          </button>
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

        <div
          className={
            'd-flex flex-row custom-input border-reg mt-auto bg-custom-white  rounded-5 px-2'
          }
        >
          <div>
            <button
              onClick={() => {
                send(sendMessage);
                setSendMessage('');
              }}
              className={'btn prm-btn  rounded-5'}
              disabled={sendMessage.length <= 0}
            >
              <Send />
            </button>
          </div>
          <input
            value={sendMessage}
            className={'custom-input-none w-100'}
            onChange={(e) => {
              setSendMessage(e.target.value);
            }}
            dir={'rtl'}
            placeholder={'your message'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && sendMessage.length > 0) {
                send(sendMessage);
                setSendMessage('');
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
