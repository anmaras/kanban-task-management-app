import React, { useEffect, useState } from 'react';
import style from './ViewTaskModal.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import { ReactComponent as ArrowUp } from '../../../assets/icon-chevron-down.svg';

const ViewTaskModal = () => {
  const { task, activeBoard } = useBoardContext();
  const { title, description, subtasks, _id } = task;
  const [selectListVisible, setSelectVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

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

    setCurrentStatus(column.name);
  };

  useEffect(() => {
    getCurrentColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCompleted = task.subtasks.filter((subtask) => subtask.isCompleted);

  const handleSelectList = () => {
    setSelectVisible(!selectListVisible);
  };

  return (
    <article className={style.modal}>
      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        {title}
      </h2>
      <p className={[style['modal__description'], 'body-L-dark'].join(' ')}>
        {description}
      </p>
      <div className={style['modal__controller']}>
        <h3 className={[style['modal__label'], 'body-M '].join(' ')}>
          SubTasks ({isCompleted.length} of {task.subtasks.length})
        </h3>
        <ul className={style['modal__list-container']}>
          {subtasks.map((subtask) => {
            const { title, _id, isCompleted } = subtask;
            return (
              <li className={style['modal__list-item']} key={_id}>
                <input type="checkbox" />
                <p className="body-M">{title}</p>
              </li>
            );
          })}
        </ul>
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
          <div
            onClick={handleSelectList}
            tabIndex="0"
            className={[style['modal__select-input'], 'body-L-dark'].join(' ')}
          >
            {currentStatus}
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
                    //field values are passed through formik setValues
                    //otherwise status field cannot be updated with custom select and options
                    onClick={() => {
                      // setCurrentStatus(name);
                      handleSelectList();
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
