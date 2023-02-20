import React, { useState, useEffect, useRef } from 'react';
import style from './DashboardMainListTask.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../../utils/StrictModeDroppable';

const DashboardMainListTasks = ({ tasks, columnId, isVisible }) => {
  const { handleViewTaskModal, getCurrentTask, activeBoard, activeColumn } =
    useBoardContext();

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            tasks.length > 0 ? style['tasksList'] : style['tasksList--empty']
          }
        >
          {tasks.map((task, index) => {
            const { title, _id, subtasks } = task;
            const isCompleted = subtasks.filter(
              (subtask) => subtask.isCompleted
            );

            return (
              <Draggable draggableId={_id} index={index} key={_id}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={[style['tasksList__item'], 'card'].join(' ')}
                    onClick={() => {
                      getCurrentTask(task);
                      handleViewTaskModal();
                    }}
                  >
                    <h3
                      className={[style['tasksList__title'], 'heading-M'].join(
                        ' '
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={[style['tasksList__subtitle'], 'body-M '].join(
                        ' '
                      )}
                    >{`${isCompleted.length} of ${subtasks.length} subtasks`}</p>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DashboardMainListTasks;
