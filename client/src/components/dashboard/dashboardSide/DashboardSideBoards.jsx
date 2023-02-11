import React from 'react';
import style from './DashboardSideBoards.module.scss';
import { ReactComponent as BoardIcon } from '../../../assets/icon-board.svg';
import { useBoardContext } from '../../../context/boardsContext';
import { useEffect } from 'react';

const DashboardSideBoards = () => {
  const { handleCreateBoardModal, boards, getUserBoards, getBoardColumns } =
    useBoardContext();
  const { boards: boardsList, totalBoards, activeBoardId } = boards;

  useEffect(() => {
    getUserBoards();
  }, []);

  return (
    <div className={style.boards}>
      <h3 className={[style['boards__title'], 'heading-S'].join(' ')}>
        ALL BOARDS ({totalBoards})
      </h3>
      <ul className={style['boards__list']}>
        {boardsList?.map((board) => {
          const { name, _id: id } = board;
          return (
            <li
              className={style['boards__item']}
              key={id}
              onClick={() => getBoardColumns(id)}
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
