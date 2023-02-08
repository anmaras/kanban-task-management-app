import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import {
  DashboardLayout,
  DashboardMain,
  DashboardSide,
} from '../../components';

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
      {!isVisible && (
        <button onClick={setVisibility} className="button-sideNav">
          show side
        </button>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
