import React from 'react';
import './style.scss';

export const InsideLoading: React.FC = () => {
  return (
    <div
      className="position-relative d-flex flex-column justify-content-center align-items-center w-100 "
      style={{ minHeight: '200px' }}
    >
      <span className="loader"></span>
    </div>
  );
};
