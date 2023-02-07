import React from 'react';
import { useUserContext } from '../context/userContext';

const DashboardPage = () => {
  const { logoutUser, user } = useUserContext();
  return (
    <div>
      <h1>Dashboard</h1>

      <h2>{user.name}</h2>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default DashboardPage;
