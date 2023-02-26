import React from 'react';
import style from './Loader.module.scss';
import Spinner from './spinner/Spinner';

const Loader = () => {
  return (
    <div className={style.container}>
      <Spinner type="big" />
    </div>
  );
};

export default Loader;
