import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import {
  DashboardLayout,
  DashboardMain,
  DashboardSide,
} from '../../components';
import { ReactComponent as Eye } from '../../assets/icon-show-sidebar.svg';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
  const { logoutUser, user } = useUserContext();
  const [isVisible, setIsVisible] = useState(true);

  const setVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DashboardLayout>
      <DashboardSide isVisible={isVisible} setVisibility={setVisibility} />
      <DashboardMain isVisible={isVisible} />
      {/* <div>
        <h1>Dashboard</h1>
        <h2>{user.name}</h2>
        <button onClick={logoutUser}>Logout</button>
      </div> */}
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
  );
};

export default DashboardPage;
