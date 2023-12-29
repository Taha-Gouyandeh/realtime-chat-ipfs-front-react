import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CustomAccordion: React.FC<{
  icon: JSX.Element;
  title: string;
  open: boolean;
  children: React.ReactNode;
}> = ({ icon, title, children, open }) => {
  const [whoOpen, setWhoOpen] = useState<boolean>(open);

  return (
    <div className="">
      <div
        onClick={() => {
          setWhoOpen(!whoOpen);
        }}
      >
        <div
          className={`d-flex flex-row  align-items-center justify-content-between g-cursor-pointer py-2 px-3 ${
            whoOpen ? 'bg-custom-light' : ''
          }`}
        >
          <div className={'d-flex flex-row gap-2'}>
            <div className={`${whoOpen ? 'prm2-text' : 'text3'}`}>{icon}</div>
            <span className={`${whoOpen ? 'text2' : 'text3'} mt-1`}>
              {title}
            </span>
          </div>
          {whoOpen ? (
            <ChevronUp className={'text2'} />
          ) : (
            <ChevronDown className={'text3'} />
          )}
        </div>
      </div>
      {whoOpen ? (
        <div>
          <div
            className="py-2"
            style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
