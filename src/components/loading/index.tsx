import React from 'react';
import './style.scss';

export const Loading: React.FC = () => {
  return (
    <div
      className="position-absolute w-100 h-100 p-1  "
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 8,
      }}
    >
      <div className="w-100 h-100  d-flex flex-column justify-content-center align-items-center bg-custom-light">
        <span className="loader"></span>
      </div>
    </div>
  );
};
