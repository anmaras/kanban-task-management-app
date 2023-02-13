import React from 'react';
import style from './DashboardSideBoards.module.scss';
import { ReactComponent as BoardIcon } from '../../../assets/icon-board.svg';
import { useBoardContext } from '../../../context/boardsContext';

const DashboardSideBoards = () => {
  const {
    handleCreateBoardModal,
    boards,
    getActiveBoardId,
    activeBoardId,
    closeModal,
  } = useBoardContext();

  return (
    <div className={style.boards}>
      <h3 className={[style['boards__title'], 'heading-S'].join(' ')}>
        ALL BOARDS ({boards.length})
      </h3>
      <ul className={style['boards__list']}>
        {boards.map((board) => {
          const { name, _id: id } = board;
          return (
            <li
              className={
                id === activeBoardId
                  ? style['boards__item--active']
                  : style['boards__item']
              }
              key={id}
              onClick={() => {
                getActiveBoardId(id);
                closeModal();
              }}
            >
              <BoardIcon />
              <h4 className="heading-M">{name}</h4>
            </li>
          );
        })}
      </ul>
      <button
        className={[style['boards__addNewBtn'], 'heading-M'].join(' ')}
        onClick={handleCreateBoardModal}
      >
        <BoardIcon />
        <span>Create New Board</span>
      </button>
    </div>
  );
};

export default DashboardSideBoards;
