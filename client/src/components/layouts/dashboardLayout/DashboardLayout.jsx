import React from 'react';
import style from './DashboardLayout.module.scss';
import { DashboardHeader, Loader } from '../../index';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useBoardContext } from '../../../context/boardsContext';

const DashboardLayout = ({ children }) => {
  const { fetchDataLoading } = useBoardContext();

  if (fetchDataLoading) {
    return <Loader />;
  }

  return (
    <section className={style.layout}>
      <DashboardHeader />
      <ScrollContainer
        component="main"
        className={style['layout__main']}
        ignoreElements={'.card'}
      >
        {children}
      </ScrollContainer>
    </section>
  );
};

export default DashboardLayout;
