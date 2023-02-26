import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as CevronDown } from '../../../assets/icon-chevron-down.svg';
import { ReactComponent as AddTaskIcon } from '../../../assets/icon-add-task-mobile.svg';
import useWindowSize from '../../../hooks/useWindowSize';
import style from './Header.module.scss';
import EditButton from '../../editButton/EditButton';
import { useBoardContext } from '../../../context/boardsContext';
import { useModalContext } from '../../../context/modalsContext';

const Header = () => {
  const { width } = useWindowSize();
  const { boards, activeBoard } = useBoardContext();
  const { sideBoardsModalToggle, addTaskModalToggle } = useModalContext();
  const boardName = activeBoard?.name || 'Board List Is Empty';
  const isDisable = !boards?.length ? true : false;
  const btnContent = width < 768 ? <AddTaskIcon /> : 'Add New Task';

  return (
    <header className={style.header}>
      <div className={style['header__logo']}>
        <Logo />
        <h1 className={[style['header__appTitle']]}>kanban</h1>
      </div>
      <div className={style['header__controls']}>
        <h2 className={[style['header__boardTitle'], 'heading-L'].join(' ')}>
          {boardName}
        </h2>
        <button
          className={style['header__boardBtn']}
          onClick={sideBoardsModalToggle}
        >
          <span className="heading-L">{boardName}</span>
          <CevronDown />
        </button>
        <div className={style['header__buttons']}>
          <button
            onClick={addTaskModalToggle}
            className="button button--primary-L"
            disabled={isDisable}
          >
            {btnContent}
          </button>
          <EditButton type="account" />
        </div>
      </div>
    </header>
  );
};

export default Header;
