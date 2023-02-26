import React from 'react';
import style from './DashboardLayout.module.scss';
import { Header } from '../../index';
import ScrollContainer from 'react-indiana-drag-scroll';

const DashboardLayout = ({ children }) => {
  return (
    <section className={style.layout}>
      <Header />
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
