import React from 'react';
import style from './Aside.module.scss';
import AsideBoardsCard from './asideBoardsCard/AsideBoardsCard';
import { ReactComponent as Eye } from '../../../assets/icon-hide-sidebar.svg';
import { useModalContext } from '../../../context/modalsContext';
import { motion, AnimatePresence } from 'framer-motion';

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 1,
  },
};

const Aside = () => {
  const { asideIsVisible, asideVisibilityToggle } = useModalContext();
  return (
    <>
      <aside className={asideIsVisible ? style['side'] : style['side--hidden']}>
        <AsideBoardsCard />
        <button
          onClick={asideVisibilityToggle}
          className={style['side__hideBtn']}
        >
          <Eye />
          <span className="heading-M">Hide Sidebar</span>
        </button>
      </aside>
      <AnimatePresence>
        {!asideIsVisible && (
          <motion.button
            onClick={asideVisibilityToggle}
            className="button-showSide"
            variants={animVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Eye />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Aside;
