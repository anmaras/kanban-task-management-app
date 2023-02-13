import React from 'react';

import { useBoardContext } from '../../../context/boardsContext';
import style from './DashboardMainList.module.scss';
import DashboardMainListTasks from './DashboardMainListTasks';

const DashboardMainList = () => {
  const {
    boards: userBoards,
    activeBoardId,
    handleAddColumnModal,
  } = useBoardContext();

  const board = userBoards.boards?.find((board) => board._id === activeBoardId);

  return (
    <ul className={style.list}>
      {board?.columns.map((column) => {
        return (
          <li className={style['list__item']} key={column._id}>
            <div className={style['list__title-container']}>
              <div className={style['list__color']}></div>
              <div className={[style['list__name'], 'heading-S'].join(' ')}>
                {column.name} (0)
              </div>
            </div>
            <DashboardMainListTasks tasks={column.tasks} />
          </li>
        );
      })}
      <li>
        <button onClick={handleAddColumnModal}>add new column</button>
      </li>
    </ul>
  );
};

export default DashboardMainList;
