import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import Spinner from '../../spinner/Spinner';

const DeleteModal = ({ type }) => {
  const { activeBoard, deleteBoard, closeModal, isLoading } = useBoardContext();
  return (
    <article>
      <h2>Delete this board</h2>
      <p>
        {`Are you sure you want to delete the ${activeBoard?.name} board? This action
        will remove all columns and tasks and cannot be reversed.`}
      </p>
      <button className="button" onClick={deleteBoard}>
        {isLoading ? <Spinner /> : 'Delete'}
      </button>
      <button className="button" onClick={closeModal}>
        Cancel
      </button>
    </article>
  );
};

export default DeleteModal;
