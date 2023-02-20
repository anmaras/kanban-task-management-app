import React, { useState, useEffect } from 'react';
import style from './DashboardMainListTask.module.scss';
import { useBoardContext } from '../../../context/boardsContext';

const DashboardMainListTasks = ({ tasks }) => {
  const { handleViewTaskModal, getCurrentTask, activeBoard, activeColumn } =
    useBoardContext();

  return (
    <ul
      className={
        tasks.length > 0 ? style['tasksList'] : style['tasksList--empty']
      }
    >
      {tasks.map((task) => {
        const { title, _id, subtasks } = task;
        const isCompleted = subtasks.filter((subtask) => subtask.isCompleted);

        return (
          <li
            className={[style['tasksList__item'], 'card'].join(' ')}
            key={_id}
            onClick={() => {
              getCurrentTask(task);
              handleViewTaskModal();
            }}
          >
            <h3 className={[style['tasksList__title'], 'heading-M'].join(' ')}>
              {title}
            </h3>
            <p
              className={[style['tasksList__subtitle'], 'body-M '].join(' ')}
            >{`${isCompleted.length} of ${subtasks.length} subtasks`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardMainListTasks;
