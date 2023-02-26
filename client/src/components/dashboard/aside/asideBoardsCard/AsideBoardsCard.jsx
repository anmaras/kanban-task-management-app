import React from 'react';
import style from './AsideBoardsCard.module.scss';
import { ReactComponent as BoardIcon } from '../../../../assets/icon-board.svg';
import { useBoardContext } from '../../../../context/boardsContext';
import { useModalContext } from '../../../../context/modalsContext';
import { EditButton } from '../../../index';

const AsideBoardsCard = () => {
  const { boards, setActiveBoardId, activeBoardId } = useBoardContext();
  const { createBoardsModalToggle, closeModals } = useModalContext();

  return (
    <div className={style.boards}>
      <div className={style['boards__title-container']}>
        <h3 className={[style['boards__title'], 'heading-S'].join(' ')}>
          ALL BOARDS ({boards?.length})
        </h3>
        <div className={style['boards__edit-btn-container']}>
          <EditButton type="board" />
        </div>
      </div>
      <ul className={style['boards__list']}>
        {boards?.map((board) => {
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
                setActiveBoardId(id);
                closeModals();
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
        onClick={createBoardsModalToggle}
      >
        <BoardIcon />
        <span>Create New Board</span>
      </button>
    </div>
  );
};

export default AsideBoardsCard;
