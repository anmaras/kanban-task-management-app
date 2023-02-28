import React, { useState, useRef } from 'react';
import { ReactComponent as Dots } from '../../assets/icon-vertical-ellipsis.svg';
import { ReactComponent as Account } from '../../assets/icon-user-account.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoardContext } from '../../context/boardsContext';
import { useUserContext } from '../../context/userContext';
import { useModalContext } from '../../context/modalsContext';
import style from './EditButton.module.scss';
import PropTypes from 'prop-types';
import useCloseOnOutsideClick from '../../hooks/useCloseOnOutsideClick';

const EditButton = ({ type }) => {
  const [state, setState] = useState(false);
  const editRef = useRef(null);
  useCloseOnOutsideClick(editRef, setState);
  const { boards } = useBoardContext();
  const { logoutUser } = useUserContext();
  const {
    editBoardsModalToggle,
    deleteBoardsModalToggle,
    deleteTaskModalToggle,
    editTaskModalToggle,
  } = useModalContext();

  const handleState = () => {
    setState(!state);
  };

  const editStateHandler =
    boards?.length > 0 || type === 'account' ? handleState : null;

  const editIcon = type !== 'account' ? <Dots /> : <Account />;
  const logoutIcon = type !== 'account' ? `Delete ${type}` : 'Logout';

  const editFunction = () => {
    if (type === 'task') {
      editTaskModalToggle();
    } else if (type === 'board') {
      editBoardsModalToggle();
    }
    setState(!state);
  };

  const editDeleteFunction = () => {
    if (type === 'task') {
      deleteTaskModalToggle();
    } else if (type === 'board') {
      deleteBoardsModalToggle();
    } else if (type === 'account') {
      logoutUser();
    }
    setState(!state);
  };

  return (
    <div className={style.editButton} ref={editRef}>
      <div
        onClick={editStateHandler}
        className={style['editButton__dots-container']}
      >
        {editIcon}
      </div>
      <AnimatePresence>
        {state && (
          <motion.div
            className={style['editButton__dropdown-container']}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {type !== 'account' ? (
              <button
                className={style['editButton__button']}
                onClick={editFunction}
              >{`Edit ${type}`}</button>
            ) : null}
            <button
              onClick={editDeleteFunction}
              className={style['editButton__button']}
            >
              {logoutIcon}
            </button>
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
