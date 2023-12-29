import React from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        'd-flex flex-column h-100 w-100 justify-content-center align-items-center'
      }
    >
      <div className="center">
        <div className="error">
          <div className="number">4</div>
          <div className="illustration">
            <div className="circle"></div>
            <div className="clip">
              <div className="paper">
                <div className="face">
                  <div className="eyes">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                  </div>
                  <div className="rosyCheeks rosyCheeks-left"></div>
                  <div className="rosyCheeks rosyCheeks-right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="number">4</div>
        </div>

        <div className="text mb-3">
          Oops. The page you're looking for doesn't exist.
        </div>
        <a
          className="rounded-4 g-cursor-pointer prm3-bg py-2 px-4 text-white"
          href="/"
        >
          Back Home
        </a>
      </div>
    </div>
  );
};
