import React from 'react';
import { PaginationType } from '../../DTO';
import { useTranslation } from 'react-i18next';

export const PaginationText: React.FC<{ pagination: PaginationType }> = ({
  pagination,
}) => {
  const { t } = useTranslation();

  return (
    <small>
      {t('Showing')} {(pagination.currentPage - 1) * 10 + 1} {t('to')}{' '}
      {pagination.currentPage * 10 <=
      (pagination?.total ? pagination?.total : 0)
        ? pagination.currentPage * 10
        : pagination.total}{' '}
      {t('of')} {pagination.total} {t('entries')}
    </small>
  );
};
