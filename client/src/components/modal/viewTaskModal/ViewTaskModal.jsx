import React, { useEffect, useState } from 'react';
import style from './ViewTaskModal.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import { ReactComponent as ArrowUp } from '../../../assets/icon-chevron-down.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icon-cross.svg';
import { EditButton } from '../../index';
import { useModalContext } from '../../../context/modalsContext';

const ViewTaskModal = () => {
  const { task, activeBoard, editSubTaskCheckBox, moveTasks } =
    useBoardContext();
  const { closeModals } = useModalContext();
  const { title, description, subtasks, _id } = task;
  const [selectListVisible, setSelectVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState({});
  const [from, setFrom] = useState('');

  //for changing the subtasks completed lengths
  const isCompleted = task.subtasks.filter((subtask) => subtask.isCompleted);

  //show columns option list
  const handleSelectList = () => {
    setSelectVisible(!selectListVisible);
  };

  //get column id
  const getColumnId = (value) => {
    const column = activeBoard.columns.find((col) => col.name === value);
    return column._id;
  };

  //that function will help to send from and to ids for moving tasks.
  const updateCurrentStatus = (value) => {
    setCurrentColumn({ id: getColumnId(value), name: value });
  };

  //get the name of current column contain the task
  const getCurrentColumn = () => {
    //search for task in flattened column array
    const task = activeBoard.columns
      .flatMap((col) => col.tasks)
      .find((task) => task._id === _id);

    //if doesn't exist return null
    if (!task) {
      return null;
    }

    //filter the columns so to find the one that include the task task
    //use pop to return that column and save the name at the currentStatus state
    const column = activeBoard.columns
      .filter((col) => col.tasks.includes(task))
      .pop();

    setCurrentColumn({ name: column.name, id: column._id });
  };

  useEffect(() => {
    getCurrentColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={style.modal}>
      <button className="button--del-icon" type="button" onClick={closeModals}>
        <DeleteIcon />
      </button>
      <div className={style['modal__title-container']}>
        <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
          {title}
        </h2>
        <EditButton type="task" />
      </div>
      <p className={[style['modal__description'], 'body-L-dark'].join(' ')}>
        {description ? description : 'No description'}
      </p>
      <div className={style['modal__controller']}>
        <h3 className={[style['modal__label'], 'body-M '].join(' ')}>
          SubTasks ({isCompleted.length} of {task.subtasks.length})
        </h3>
        {subtasks.length > 0 ? (
          <ul className={style['modal__list-container']}>
            {subtasks.map((subtask) => {
              const { title, _id, isCompleted } = subtask;
              return (
                <li className={style['modal__list-item']} key={_id}>
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {
                      editSubTaskCheckBox(_id, currentColumn.id);
                    }}
                  />
                  <p className="body-M">{title}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={[style['modal__noSubtask-text'], 'body-M '].join(' ')}>
            No Subtasks
          </p>
        )}
      </div>

      {/* DROPDOWN  SELECT*/}

      <section className={style['modal__dropdown-container']}>
        <div className={style['modal__controller']}>
          <label
            htmlFor="status"
            className={[style['modal__label'], 'body-M '].join(' ')}
          >
            Current Status
          </label>
          {/* ON CLICK WILL KEEP TRACK THE ID THAT WILL BE USED AS FROM*/}
          <div
            onClick={() => {
              handleSelectList();
              setFrom(currentColumn.id);
            }}
            tabIndex="0"
            className={[style['modal__select-input'], 'body-L-dark'].join(' ')}
          >
            {currentColumn.name}
            <span
              className={
                selectListVisible
                  ? style['modal__arrowUp']
                  : style['modal__arrowDown']
              }
            >
              <ArrowUp />
            </span>
          </div>

          {/* DROPDOWN  OPTION LIST*/}

          {selectListVisible ? (
            <ul className={style['modal__select-list']}>
              {activeBoard?.columns.map((column) => {
                const { name, _id } = column;
                return (
                  <li
                    onClick={() => {
                      updateCurrentStatus(name);
                      handleSelectList();
                      moveTasks(from, _id);
                    }}
                    className={style['modal__option']}
                    key={_id}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </section>
    </article>
  );
};

export default ViewTaskModal;
