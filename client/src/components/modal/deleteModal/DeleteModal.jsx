import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import { useModalContext } from '../../../context/modalsContext';
import { Spinner } from '../../index';
import style from './DeleteModal.module.scss';
import PropTypes from 'prop-types';
import { useUserContext } from '../../../context/userContext';

const DeleteModal = ({ type }) => {
  const { activeBoard, deleteBoard, isLoading, task, deleteTask } =
    useBoardContext();
  const { user, deleteUserAccount } = useUserContext();
  const { closeModals } = useModalContext();
  const buttonContent = isLoading ? <Spinner /> : 'Delete';

  const title =
    type === 'board'
      ? 'Delete this board?'
      : type === 'account'
      ? 'Delete this account?'
      : 'Delete this task?';

  const onClick =
    type === 'board'
      ? deleteBoard
      : type === 'task'
      ? deleteTask
      : deleteUserAccount;

  return (
    <article className={style.modal}>
      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        {title}
      </h2>

      {type === 'board' && (
        <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
          Are you sure you want to delete the <b>{activeBoard?.name}</b> board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
      )}
      {type === 'task' && (
        <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
          Are you sure you want to delete the <b>{task?.title}</b> task and it's
          subtasks? This action cannot be reversed.
        </p>
      )}
      {type === 'account' && (
        <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
          Are you sure you want to delete your account <b>{user.name}</b> ? This
          action will remove all your data and cannot be reversed!
        </p>
      )}
      <div className={style['modal__btns-container']}>
        <button className="button button--secondary--delete" onClick={onClick}>
          {buttonContent}
        </button>
        <button className="button button--secondary" onClick={closeModals}>
          Cancel
        </button>
      </div>
    </article>
  );
};

DeleteModal.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DeleteModal;
