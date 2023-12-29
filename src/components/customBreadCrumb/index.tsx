import React from 'react';
import './style.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../redux-config/hooks';
import { selectLanguage } from '../../redux-config/entities/language';

export const CustomBreadCrumb: React.FC<{
  breadCrumbList: { name: string; href: string }[];
}> = ({ breadCrumbList }) => {
  const language = useAppSelector(selectLanguage);

  return (
    <div className={'d-flex flex-row align-items-center'}>
      {breadCrumbList.map((item, index) => (
        <span
          className={`${
            breadCrumbList.length != index + 1 ? 'text3' : 'text2'
          }`}
        >
          {item.name}
          {breadCrumbList.length != index + 1 ? (
            <small className={'mx-1'}>
              {language == 'en' ? (
                <ChevronRight size={'16'} />
              ) : (
                <ChevronLeft size={'16'} />
              )}
            </small>
          ) : (
            <></>
          )}
        </span>
      ))}
    </div>
  );
};
