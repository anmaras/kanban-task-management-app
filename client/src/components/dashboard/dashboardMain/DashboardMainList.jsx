import React, { useEffect, useState } from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import style from './DashboardMainList.module.scss';
import DashboardMainListTasks from './DashboardMainListTasks';
import { DragDropContext } from 'react-beautiful-dnd';

const DashboardMainList = () => {
  const { activeBoard, handleAddColumnModal, dndTask } = useBoardContext();
  const [draggableData, setDraggableData] = useState(activeBoard);

  const onDragEnd = (result) => {
    const { destination, source } = result;

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
    const destinationCol = draggableData?.columns?.find(
      (col) => col._id === destination.droppableId
    );
    const task = sourceCol?.tasks[source.index];

    if (sourceCol._id === destinationCol._id) {
      sourceCol?.tasks?.splice(source.index, 1);
      sourceCol?.tasks?.splice(destination.index, 0, task);

      const newSourceCol = {
        ...sourceCol,
        tasks: sourceCol.tasks,
      };

      const newDraggableData = {
        ...draggableData,
        columns: draggableData.columns.map((col) =>
          col._id === source.droppableId ? newSourceCol : col
        ),
      };

      setDraggableData(newDraggableData);
      dndTask(result);
      return;
    }

    sourceCol?.tasks?.splice(source.index, 1);

    const newSourceCol = {
      ...sourceCol,
      tasks: sourceCol?.tasks,
    };

    destinationCol?.tasks?.splice(destination.index, 0, task);

    const newDestCol = {
      ...destinationCol,
      tasks: destinationCol?.tasks,
    };

    const newDraggableData = {
      ...draggableData,
      columns: draggableData.columns.map((col) =>
        col._id === source.droppableId
          ? newSourceCol
          : col._id === destination.droppableId
          ? newDestCol
          : col
      ),
    };

    setDraggableData(newDraggableData);
    dndTask(result);
    return;
  };

  useEffect(() => {
    setDraggableData(activeBoard);
  }, [activeBoard]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className={style.list}>
        {draggableData?.columns?.map((column) => {
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
