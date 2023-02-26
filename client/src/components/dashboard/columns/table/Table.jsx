import React from 'react';
import style from './Table.module.scss';
import { useBoardContext } from '../../../../context/boardsContext';
import { useModalContext } from '../../../../context/modalsContext';
import { Options, List } from '../../../index';

const Table = () => {
  const { boards } = useBoardContext();
  const { asideIsVisible } = useModalContext();
  const length = boards.length === 0;

  if (length) return <Options />;

  return (
    <section className={asideIsVisible ? style['board'] : style['board--move']}>
      <List />
    </section>
  );
};

export default Table;
