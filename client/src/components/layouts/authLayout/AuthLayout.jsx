import React from 'react';
import style from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => {
  return (
    <section className={style['layout']}>
      <header className={style['layout__header']}>
        <h1 className={style['layout__title']}>kanban</h1>
      </header>
      <main className={style['layout__main']}>{children}</main>
    </section>
  );
};

export default AuthLayout;
