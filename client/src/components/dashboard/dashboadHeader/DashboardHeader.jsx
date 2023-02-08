import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as CevronDown } from '../../../assets/icon-chevron-down.svg';
import { ReactComponent as AddTaskIcon } from '../../../assets/icon-add-task-mobile.svg';
import useWindowSize from '../../../hooks/useWindowSize';
import style from './DashboardHeader.module.scss';
import EditButton from '../../editButton/EditButton';

const DashboardHeader = () => {
  const { width } = useWindowSize();

  return (
    <header className={style.header}>
      <div className={style['header__logo']}>
        <Logo />
        <h1 className={[style['header__appTitle']]}>kanban</h1>
      </div>

      <div className={style['header__controls']}>
        <h2 className={[style['header__boardTitle'], 'heading-L'].join(' ')}>
          board title
        </h2>
        <button className={style['header__boardBtn']}>
          <span className="heading-L">board title</span>
          <CevronDown />
        </button>
        <div className={style['header__buttons']}>
          <button className="button button--primary-L">
            {width < 768 ? <AddTaskIcon /> : 'Add New Task'}
          </button>
          <EditButton type="board" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;