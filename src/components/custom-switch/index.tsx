import React from 'react';
import './style.scss';

export const CustomSwitch: React.FC<{
  onClick?: Function;
  defaultChecked?: boolean;
}> = ({ onClick, defaultChecked }) => {
  return (
    <label
      className="switch"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <input
        type="checkbox"
        className="checkbox"
        defaultChecked={defaultChecked ? defaultChecked : false}
      />
      <div className="slider"></div>
    </label>
  );
};
