import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import Spinner from '../../spinner/Spinner';
import style from './DeleteModal.module.scss';

const DeleteModal = ({ type }) => {
  const { activeBoard, deleteBoard, closeModal, isLoading } = useBoardContext();
  return (
    <article className={style.modal}>
      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        {type === 'boards' ? 'Delete this board?' : 'Delete this task?'}
      </h2>
      <p className={[style['modal__subtitle'], 'body-L-dark'].join(' ')}>
        Are you sure you want to delete the <b>{activeBoard?.name}</b> board?
        This action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={style['modal__btns-container']}>
        <button
          className="button button--secondary--delete"
          onClick={deleteBoard}
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
