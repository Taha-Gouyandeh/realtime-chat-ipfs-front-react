import React from 'react';
import './style.scss';

export const CustomTable: React.FC<{
  header: JSX.Element[];
  items: JSX.Element[][];
}> = ({ header, items }) => {
  return (
    <div className={'w-100 overflow-x-auto overflow-y-hidden text-center'}>
      <table className={'w-100 '}>
        <tr className={'align-baseline bg-custom-light '}>
          {header.map((item, index) => (
            <th key={index} className={'text-nowrap p-3 text2'}>
              {item}
            </th>
          ))}
        </tr>
        {items.map((item, index) => (
          <tr className={'align-baseline row-hover border-bottom'} key={index}>
            {item.map((subItem, subIndex) => (
              <td key={subIndex} className={'text-nowrap px-3 py-2 '}>
                {subItem}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};
