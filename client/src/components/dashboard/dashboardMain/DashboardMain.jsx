import React from 'react';
import style from './DashboardMain.module.scss';
import { useBoardContext } from '../../../context/boardsContext';

const DashboardMain = ({ isVisible }) => {
  const { boards: userBoards, activeBoardId } = useBoardContext();

  const board = userBoards.boards?.find((board) => board._id === activeBoardId);

  return (
    <div className={isVisible ? style['board'] : style['board--move']}>
      DashboardMain
      <ul>
        {board?.columns.map((column) => {
          return <li key={column._id}>{column.name}</li>;
        })}
      </ul>
      {/* <div className={style['board__addWrapper']}>
        <h2 className={[style['board__addTitle'], 'heading-L'].join(' ')}>
          This board is empty. Create a new column to get started.
        </h2>
        <button className="button button--primary-L ">Add New Column</button>
      </div> */}
    </div>
  );
};

export default DashboardMain;
