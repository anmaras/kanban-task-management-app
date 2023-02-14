import React from 'react';
import style from './DashboardMainListTask.module.scss';

const DashboardMainListTasks = ({ tasks }) => {
  return (
    <ul className={style.tasksList}>
      {tasks.map((task) => {
        return <li key={task.title}>{task.title}</li>;
      })}
    </ul>
  );
};

export default DashboardMainListTasks;
