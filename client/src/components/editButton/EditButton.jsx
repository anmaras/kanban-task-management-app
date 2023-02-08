import React, { useState, useRef } from 'react';
import { ReactComponent as Dots } from '../../assets/icon-vertical-ellipsis.svg';
import { motion, AnimatePresence } from 'framer-motion';
import style from './EditButton.module.scss';
import PropTypes from 'prop-types';
import useCloseOnOutsideClick from '../../hooks/useCloseOnOutsideClick';

const EditButton = ({ type }) => {
  const [state, setState] = useState(false);
  const editRef = useRef(null);
  useCloseOnOutsideClick(editRef, setState);

  const handleState = () => {
    setState(!state);
  };

  return (
    <div className={style.editButton} ref={editRef}>
      <div
        onClick={handleState}
        className={style['editButton__dots-container']}
      >
        <Dots />
      </div>
      <AnimatePresence key="edit-btn">
        {state && (
          <motion.div
            className={style['editButton__dropdown-container']}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className={style['editButton__button']}
            >{`Edit ${type}`}</button>
            <button
              className={style['editButton__button']}
            >{`Delete ${type}`}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

EditButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default EditButton;