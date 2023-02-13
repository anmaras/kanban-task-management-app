import React from 'react';

const DashboardMainListTasks = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => {
        return <li key={task.title}>{task.title}</li>;
      })}
    </ul>
  );
};

export default DashboardMainListTasks;
