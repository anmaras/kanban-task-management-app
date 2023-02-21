import React from 'react';
import style from './DashboardMainListTask.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../../utils/StrictModeDroppable';

const DashboardMainListTasks = ({ tasks, columnId }) => {
  const { handleViewTaskModal, getCurrentTask } = useBoardContext();

  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            tasks?.length > 0 && !snapshot.isDraggingOver
              ? style['list']
              : snapshot.isDraggingOver
              ? style['list--droppable']
              : style['list--empty']
          }
        >
          {tasks?.map((task, index) => {
            const { title, _id, subtasks } = task;
            const isCompleted = subtasks.filter((sub) => sub.isCompleted);

            return (
              <Draggable draggableId={_id} index={index} key={_id}>
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={[
                      snapshot.isDragging
                        ? style['list__item--dragging']
                        : style['list__item'],
                      'card',
                    ].join(' ')}
                    onClick={() => {
                      getCurrentTask(task);
                      handleViewTaskModal();
                    }}
                  >
                    <h3
                      className={[style['list__title'], 'heading-M'].join(' ')}
                    >
                      {title}
                    </h3>
                    <p
                      className={[style['list__subtitle'], 'body-M '].join(' ')}
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
