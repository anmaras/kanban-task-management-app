import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import style from './Backdrop.module.scss';

const Backdrop = ({ children }) => {
  const { closeModal } = useBoardContext();
  return (
    <div
      className={style.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          //need to stop the bubble so modals to work
          e.stopPropagation();
          closeModal();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Backdrop;
