import { FC, useEffect, useState } from 'react';
import {
  getLocalItems,
  useAppDispatch,
  useAppSelector,
} from '../../redux-config/hooks';
import { useTranslation } from 'react-i18next';
import { loginUserAction, selectUser } from '../../redux-config/entities/user';
import { useAppNavigate } from '../../Router/hook';
import { selectLanguage } from '../../redux-config/entities/language';
import { LoginApi } from '../../api';
import './style.scss';
import { Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

export const Login: FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const navigate = useAppNavigate();
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    if (user.accessToken && user.accessToken.length > 1) {
      navigate('/');
    }
  }, [user]);

  const handleCreateUser = (name: string, password: string) => {
    LoginApi.UserRegister(name, password)
      .then((data) => {
        setIsLogin(true);
        Swal.fire({
          icon: 'success',
          text:
            language === 'en'
              ? 'Your registration was successfully please login '
              : 'ثبت نام شما با موفقیت انجام شد لطفا وارد شوید',
        });
      })
      .catch((err) => {});
  };

  const handleLoginUser = (name: string, password: string) => {
    dispatch(loginUserAction({ username: name, password: password }));
  };

  return (
    <div
      style={{ height: '100dvh' }}
      className="loginContainer bg-custom-light"
      dir={language == 'en' ? 'ltr' : 'rtl'}
    >
      <div className="bg-custom-white rounded-5 d-flex flex-row container p-4">
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column gap-2 p-3 m-1 h-100">
            <div
              className={'d-flex flex-row align-items-center text-center mb-3'}
            >
              <h3
                className={`  w-100 px-1 pb-2 g-cursor-pointer ${
                  isLogin ? 'border-bottom border-2' : 'text-muted'
                }`}
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                {t('Login')}
              </h3>
              <h3
                className={`  w-100 px-1 pb-2 g-cursor-pointer ${
                  isLogin ? 'text-muted border-2' : 'border-bottom'
                }`}
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                {t('Register')}
              </h3>
            </div>
            <div className="position-relative col-12 p-2 d-flex flex-column gap-1">
              <label htmlFor="username">{t('username')}</label>
              <input
                id="username"
                aria-label="username"
                className={`custom-input w-100 rounded-3  border-reg`}
                placeholder={t('username') + ''}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="position-relative col-12 p-2 d-flex flex-column gap-1">
              <label htmlFor="password">{t('password')}</label>
              <div
                className={
                  'd-flex flex-row align-items-center custom-input border-reg rounded-3'
                }
              >
                <input
                  id="password"
                  aria-label="password"
                  className={`custom-input-none w-100  `}
                  type={passwordShow ? 'text' : 'password'}
                  placeholder={t('password') + ''}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {passwordShow ? (
                  <Eye
                    className={'g-cursor-pointer'}
                    onClick={() => {
                      setPasswordShow(false);
                    }}
                  />
                ) : (
                  <EyeOff
                    className={'g-cursor-pointer'}
                    onClick={() => {
                      setPasswordShow(true);
                    }}
                  />
                )}
              </div>
            </div>
            {isLogin ? (
              <>
                <label
                  className={'d-flex flex-row align-items-center gap-2 px-1'}
                >
                  <input type={'checkbox'} />
                  <span>save my login</span>
                </label>
                <button
                  className={'btn prm-btn px-1 mt-auto'}
                  onClick={() => {
                    handleLoginUser(userName, password);
                  }}
                  disabled={!(userName.length > 2 && password.length > 4)}
                >
                  {t('Login')}
                </button>
              </>
            ) : (
              <button
                className={'btn prm-btn px-1 mt-auto'}
                onClick={() => {
                  handleCreateUser(userName, password);
                }}
                disabled={!(userName.length > 2 && password.length > 4)}
              >
                {t('Register')}
              </button>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 d-none d-md-flex justify-content-center bg-custom-light rounded-3">
          <img
            src="./image/login-image.webp"
            alt="login"
            className="align-items-center align-self-center w-100"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
};
