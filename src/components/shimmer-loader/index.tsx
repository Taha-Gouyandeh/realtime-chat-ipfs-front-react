import React from 'react';
import './style.scss';

export const Shimmer: React.FC<{ width: string; height: string }> = ({
  width,
  height,
}) => {
  return (
    <div className="shimmerBG " style={{ height: height, width: width }}></div>
  );
};
