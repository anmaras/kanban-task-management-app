import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DashboardLayout,
  DashboardMain,
  DashboardSide,
  PortalComponents,
} from '../../components';
import { ReactComponent as Eye } from '../../assets/icon-show-sidebar.svg';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
  const [isVisible, setIsVisible] = useState(true);

  const setVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {createPortal(<PortalComponents />, document.body)}
      <DashboardLayout>
        <DashboardSide isVisible={isVisible} setVisibility={setVisibility} />
        <DashboardMain isVisible={isVisible} />
        <AnimatePresence>
          {!isVisible && (
            <motion.button
              onClick={setVisibility}
              className="button-showSide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Eye />
            </motion.button>
          )}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
