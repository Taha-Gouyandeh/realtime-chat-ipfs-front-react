import React from 'react';
import './style.scss';
import { X } from 'lucide-react';

export const CustomModal: React.FC<{
  showModal: boolean;
  setShowModal: Function;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'lg';
}> = ({ showModal, setShowModal, children, title, size }) => {
  if (!showModal) {
    return <></>;
  } else {
    return (
      <div>
        <div
          className={'custom-modal-back'}
          onClick={() => {
            setShowModal(false);
          }}
        ></div>

        <div
          className={`position-absolute p-3 bg-custom-white col-11 rounded-2  ${
            !size
              ? 'col-md-8 col-lg-5'
              : size == 'sm'
                ? 'col-md-6 col-lg-4'
                : 'col-md-10 col-lg-8'
          }`}
          style={{
            top: '50px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            zIndex: 11,
          }}
          onClick={() => {}}
        >
          <div className="d-flex flex-row justify-content-between">
            <strong>{title}</strong>
            <X
              className="g-cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </div>
          <hr />
          {children}
        </div>
      </div>
    );
  }
};
