import React from 'react';
import { createPortal } from 'react-dom';
import { useBoardContext } from '../../context/boardsContext';
import {
  DashboardLayout,
  PortalComponents,
  Loader,
  Aside,
  Table,
} from '../../components/index';

const DashboardPage = () => {
  const { fetchDataLoading: isLoading } = useBoardContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {createPortal(<PortalComponents />, document.body)}
      <DashboardLayout>
        <Aside />
        <Table />
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
