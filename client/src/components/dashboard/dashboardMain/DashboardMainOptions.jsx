import React from 'react';
import { useBoardContext } from '../../../context/boardsContext';
import style from './DashboardMainOptions.module.scss';

const DashboardMainOptions = ({ isVisible }) => {
  const { handleCreateBoardModal } = useBoardContext();

  return (
    <article className={style[isVisible ? 'options' : 'options--move']}>
      <h2 className={[style['options__title'], 'heading-L'].join(' ')}>
        There are not any boards. Create a new board to get started.
      </h2>
      <button
        className="button button--primary-L "
        onClick={handleCreateBoardModal}
      >
        Create a new board
      </button>
    </article>
  );
};

export default DashboardMainOptions;
