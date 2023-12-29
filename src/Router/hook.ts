import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PaginationType } from '../DTO';

export const useAppQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const useAppPagination = (): PaginationType => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const per_page = Number(params.get('per_page'));
  const current_page = Number(params.get('current_page'));

  return {
    total: 0,
    perPage: per_page === 0 ? 10 : per_page,
    currentPage: current_page === 0 ? 1 : current_page,
  };
};

export const useAppNavigate = () => useNavigate();

export const useAppParams = () => useParams();

export const useAppLocation = () => useLocation();
