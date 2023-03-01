import React from 'react';
import { useModalContext } from '../../../context/modalsContext';
import style from './Backdrop.module.scss';
import { motion } from 'framer-motion';

const Backdrop = ({ children }) => {
  const { closeModals } = useModalContext();
  return (
    <motion.div
      className={style.backdrop}
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) {
          //need to stop further propagation so modals to work
          e.stopPropagation();
          closeModals();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
