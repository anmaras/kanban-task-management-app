import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../components/index';
import Typewriter from 'typewriter-effect';
import style from './LandingPage.module.scss';
import { features } from '../../utils/constants';
import { animate, motion } from 'framer-motion';

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
                .deleteAll()
                .typeString('columns.')
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </h1>
        <ul className={style['landingPage__features']}>
          {features.map((item, index) => {
            const { id, title, content } = item;
            return (
              <motion.li
                key={id}
                className={style['landingPage__feature']}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: 'spring',
                    delay: 0.2 * index,
                    duration: 1,
                  },
                }}
              >
                <h3 className="heading-M">{title}</h3>
                <p>{content}</p>
              </motion.li>
            );
          })}
        </ul>
        <motion.p
          className={style['landingPage__subtitle']}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2, delay: 0.75 } }}
        >
          Kanban will provide a simple yet effective solution for managing your
          projects and tasks.
        </motion.p>
        <motion.div
          className={style['landingPage__btn-container']}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2, delay: 1 } }}
        >
          <Link to="/login" className="button button--auth">
            Get Started
          </Link>
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default LandingPage;
