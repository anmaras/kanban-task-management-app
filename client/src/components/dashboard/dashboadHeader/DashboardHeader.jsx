import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as CevronDown } from '../../../assets/icon-chevron-down.svg';
import { ReactComponent as AddTaskIcon } from '../../../assets/icon-add-task-mobile.svg';
import useWindowSize from '../../../hooks/useWindowSize';
import style from './DashboardHeader.module.scss';
import EditButton from '../../editButton/EditButton';
import { useBoardContext } from '../../../context/boardsContext';

const DashboardHeader = () => {
  const { width } = useWindowSize();
  const { handleSideBoardModal, boards, activeBoard, handleAddTaskModal } =
    useBoardContext();

  return (
    <header className={style.header}>
      <div className={style['header__logo']}>
        <Logo />
        <h1 className={[style['header__appTitle']]}>kanban</h1>
      </div>

      <div className={style['header__controls']}>
        <h2 className={[style['header__boardTitle'], 'heading-L'].join(' ')}>
          {activeBoard?.name || 'Board List Is Empty'}
        </h2>

        <button
          className={style['header__boardBtn']}
          onClick={handleSideBoardModal}
        >
          <span className="heading-L">
            {activeBoard?.name || 'Board List Is Empty'}
          </span>
          <CevronDown />
        </button>
        <div className={style['header__buttons']}>
          <button
            onClick={handleAddTaskModal}
            className="button button--primary-L"
            disabled={!boards?.length ? true : false}
          >
            {width < 768 ? <AddTaskIcon /> : 'Add New Task'}
          </button>
          {/* <EditButton type="board" /> */}
          <EditButton type="account" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
