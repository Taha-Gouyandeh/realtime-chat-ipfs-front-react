import React, { useEffect } from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../../redux-config/hooks';
import {
  selectDarkMode,
  setDarkMode,
} from '../../../redux-config/entities/dark-mode';
import { selectUser } from '../../../redux-config/entities/user';
import '../../../config/bootstrap/custom.scss';
import {
  selectLanguage,
  setLanguage,
} from '../../../redux-config/entities/language';
import { useTranslation } from 'react-i18next';
import { Bell, LayoutGrid, Menu } from 'lucide-react';
import { DarkLightBtn } from '../../dark-light-btn';

export const SiteLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const user = useAppSelector(selectUser);
  const language = useAppSelector(selectLanguage);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  const requestFullScreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };
  return (
    <div
      className="d-flex flex-row position-relative"
      style={{ height: '100dvh', width: '100vw' }}
      dir={language == 'en' ? 'ltr' : 'rtl'}
      data-bs-theme={darkMode ? 'dark' : 'light'}
    >
      <div className={'col-12  h-100 position-relative'}>
        <div
          className={
            'd-flex flex-row shadow-sm w-100 p-3 bg-custom-white border-end border-start justify-content-between position-relative'
          }
          style={{ height: '4rem', zIndex: '1' }}
        >
          <div>
            <label htmlFor={'sidebarCheck'} className={'d-block d-lg-none'}>
              <Menu className={'g-cursor-pointer'} />
            </label>
          </div>
          <div
            className={
              'd-flex flex-row w-100 justify-content-between  px-3 align-items-center'
            }
          >
            <div className={'d-flex flex-row gap-2 align-items-center'}>
              <div
                className={
                  'd-flex flex-row align-items-center text4 py-1 px-2 rounded-2 gap-2 g-cursor-pointer bg-custom-light'
                }
                onClick={() => {
                  dispatch(setLanguage(language == 'en' ? 'fa' : 'en'));
                  i18n.changeLanguage(language == 'en' ? 'fa' : 'en');
                }}
                dir={'ltr'}
              >
                {language == 'en' ? (
                  <>
                    <img
                      src={'/image/americanFlag.png'}
                      className={'rounded-circle'}
                      height={20}
                      width={20}
                    />
                    <small className={'mt-1 text3'}>{t('english')}</small>
                  </>
                ) : (
                  <>
                    <img
                      src={'/image/iranflag.png'}
                      className={'rounded-circle'}
                      height={20}
                      width={20}
                    />
                    <small className={'mt-1 text3'}>{t('persian')}</small>
                  </>
                )}
              </div>
              <LayoutGrid
                onClick={requestFullScreen}
                className={'g-cursor-pointer text4'}
              />
              <Bell className={'text4'} />
              <DarkLightBtn
                IsLight={darkMode}
                setLight={(data: boolean) => {
                  dispatch(setDarkMode(data));
                }}
              />
            </div>
            <div className={'d-flex flex-row gap-2 align-items-center'}>
              <span>{user.username}</span>
              <img src={'/image/userProfile.png'} height={40} width={40} />
            </div>
          </div>
        </div>
        <div
          className={
            'bg-custom-light main-site-layout p-3 overflow-y-auto pb-5'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};
