import React from 'react';
import { useModalContext } from '../../../context/modalsContext';
import style from './Backdrop.module.scss';

const Backdrop = ({ children }) => {
  const { closeModals } = useModalContext();
  return (
    <div
      className={style.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          //need to stop further propagation so modals to work
          e.stopPropagation();
          closeModals();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Backdrop;
