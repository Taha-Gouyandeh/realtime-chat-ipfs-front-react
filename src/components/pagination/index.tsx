import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './style.scss';

export const CustomPagination: React.FC<{
  total?: number;
  perPage: number;
  currentPage: number;
  changePage: Function;
}> = ({ total, perPage, currentPage, changePage }) => {
  let maxSize = Math.ceil(total ? total / perPage : 0 / perPage);

  return (
    <div
      className="d-flex flex-row align-items-center justify-content-center mt-3 "
      dir={'ltr'}
    >
      <ChevronLeft
        onClick={() => {
          if (+currentPage > 1) {
            changePage(+currentPage - 1);
          }
        }}
        className={'page-number'}
      />
      {+currentPage != 1 && (
        <span
          onClick={() => {
            changePage(1);
          }}
          className={'page-number'}
        >
          {1}
        </span>
      )}
      {3 < +currentPage && <span className={'page-number'}>...</span>}

      {+currentPage - 1 > 1 && (
        <span
          onClick={() => {
            changePage(+currentPage - 1);
          }}
          className={'page-number'}
        >
          {+currentPage - 1}
        </span>
      )}
      <span className={'page-number-active'}>{+currentPage}</span>
      {+currentPage + 1 < maxSize && (
        <span
          onClick={() => {
            changePage(+currentPage + 1);
          }}
          className={'page-number'}
        >
          {+currentPage + 1}
        </span>
      )}

      {+currentPage + 2 < maxSize && <span className={'page-number'}>...</span>}

      {maxSize > 1 && +currentPage != maxSize && (
        <span
          onClick={() => {
            changePage(maxSize);
          }}
          className={'page-number'}
        >
          {maxSize}
        </span>
      )}
      <ChevronRight
        onClick={() => {
          if (+currentPage < maxSize) {
            changePage(+currentPage + 1);
          }
        }}
        className={'page-number'}
      />
    </div>
  );
};
