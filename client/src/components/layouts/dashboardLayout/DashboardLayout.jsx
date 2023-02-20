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
        hideScrollbars="false"
        className={style['layout__main']}
      >
        {children}
      </ScrollContainer>
    </section>
  );
};

export default DashboardLayout;
