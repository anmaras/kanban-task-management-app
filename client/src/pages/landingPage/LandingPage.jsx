import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../components/index';
import Typewriter from 'typewriter-effect';
import style from './LandingPage.module.scss';

const LandingPage = () => {
  return (
    <HomeLayout>
      <div className={style.landingPage}>
        <h1
          className={[[style['landingPage__title']], 'heading-XXL'].join(' ')}
        >
          A visual system for managing work by using{' '}
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('cards.')
                .pauseFor(2500)
                .deleteAll()
                .typeString('boards.')
                .pauseFor(2500)
                .deleteAll()
                .typeString('columns.')
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </h1>
        <p className={style['landingPage__subtitle']}>
          Kanban will provide a simple yet effective solution for managing
          projects and tasks.
        </p>
        <Link to="/login" className="button button--auth">
          Get Started
        </Link>
      </div>
    </HomeLayout>
  );
};

export default LandingPage;
