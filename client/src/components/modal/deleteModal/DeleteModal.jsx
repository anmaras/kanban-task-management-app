import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import Spinner from '../../spinner/Spinner';
import style from './DeleteModal.module.scss';

const DeleteModal = ({ type }) => {
  const { activeBoard, deleteBoard, closeModal, isLoading, task, deleteTask } =
    useBoardContext();
  return (
    <article className={style.modal}>
      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        {type === 'board' ? 'Delete this board?' : 'Delete this task?'}
      </h2>

      {type === 'board' ? (
        <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
          Are you sure you want to delete the <b>{activeBoard?.name}</b> board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
      ) : (
        <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
          Are you sure you want to delete the <b>{task?.title}</b> task and it's
          subtasks? This action cannot be reversed.
        </p>
      )}
      <div className={style['modal__btns-container']}>
        <button
          className="button button--secondary--delete"
          onClick={type === 'board' ? deleteBoard : deleteTask}
        >
          {isLoading ? <Spinner /> : 'Delete'}
        </button>
        <button className="button button--secondary" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </article>
  );
};

export default DeleteModal;
