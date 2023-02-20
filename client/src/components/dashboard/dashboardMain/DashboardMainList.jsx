import React, { useState } from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import style from './DashboardMainList.module.scss';
import DashboardMainListTasks from './DashboardMainListTasks';
import { DragDropContext } from 'react-beautiful-dnd';

const DashboardMainList = ({ isVisible }) => {
  const { activeBoard, handleAddColumnModal } = useBoardContext();
  const [draggableData, setDraggableData] = useState(activeBoard);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = draggableData?.columns?.find(
      (col) => col._id === source.droppableId
    );
    // const destinationCol = draggableData?.columns?.find(
    //   (col) => col._id === destination.droppableId
    // );

    const task = sourceCol?.tasks[source.index];

    sourceCol?.tasks?.splice(source.index, 1);
    sourceCol?.tasks?.splice(destination.index, 0, task);

    const newCol = {
      ...sourceCol,
      tasks: sourceCol.tasks,
    };

    const newDraggableData = {
      ...draggableData,
      columns: draggableData.columns.map((col) =>
        col._id === source.droppableId ? newCol : col
      ),
    };

    setDraggableData(newDraggableData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className={style.list}>
        {activeBoard?.columns?.map((column) => {
          return (
            <li className={style['list__item']} key={column._id}>
              <div className={style['list__title-container']}>
                <div className={style['list__color']}></div>
                <div className={[style['list__name'], 'heading-S'].join(' ')}>
                  {column?.name} ({column?.tasks?.length})
                </div>
              </div>
              <DashboardMainListTasks
                tasks={column?.tasks}
                columnId={column?._id}
                isVisible={isVisible}
              />
            </li>
          );
        })}
        <li className={style['list__item']}>
          <div className={style['list__title-container']}>
            <div className={style['list__color']}></div>
          </div>
          <div className={style['list__btn-container']}>
            <button
              className="button heading-XL button-addColumn"
              onClick={handleAddColumnModal}
            >
              add new column
            </button>
          </div>
        </li>
      </ul>
    </DragDropContext>
  );
};

export default DashboardMainList;
