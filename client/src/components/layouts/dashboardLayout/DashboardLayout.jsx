import React from 'react';
import style from './DashboardLayout.module.scss';
import { DashboardHeader } from '../../index';
import ScrollContainer from 'react-indiana-drag-scroll';

const DashboardLayout = ({ children }) => {
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
