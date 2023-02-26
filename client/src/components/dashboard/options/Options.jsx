import React from 'react';
import { useModalContext } from '../../../context/modalsContext';
import style from './Options.module.scss';

const Options = () => {
  const { asideIsVisible, createBoardsModalToggle } = useModalContext();

  return (
    <article className={style[asideIsVisible ? 'options' : 'options--move']}>
      <h2 className={[style['options__title'], 'heading-L'].join(' ')}>
        There are not any boards. Create a new board to get started.
      </h2>
      <button
        className="button button--primary-L "
        onClick={createBoardsModalToggle}
      >
        Create a new board
      </button>
    </article>
  );
};

export default Options;
