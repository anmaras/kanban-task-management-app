import React from 'react';
import style from './DashboardLayout.module.scss';
import { DashboardHeader } from '../../index';
const DashboardLayout = ({ children }) => {
  return (
    <section className={style.layout}>
      <DashboardHeader />
      <main className={style['layout__main']}>{children}</main>
    </section>
  );
};

export default DashboardLayout;
