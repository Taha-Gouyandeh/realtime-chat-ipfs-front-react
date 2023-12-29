import React, { useEffect, useState } from 'react';

export const SearchComponent: React.FC<{
  fetchDataApi: Function;
  name?: string;
}> = ({ name, fetchDataApi }) => {
  const [timer, setTimer] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      return () => handleTime();
    }
  }, [name]);

  useEffect(() => {
    if (timer) {
      fetchDataApi();
    }
  }, [timer]);

  const handleTime = () => {
    setTimer(false);
    setTimeout(() => {
      setTimer(true);
    }, 1000);
  };

  return <></>;
};
