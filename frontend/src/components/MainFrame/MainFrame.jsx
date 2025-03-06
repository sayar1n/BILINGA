import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import Header from '../Header/Header';
import InfoSide from '../InfoSide/InfoSide';
import styles from './MainFrame.module.scss';

const MainFrame = () => {
  return (
    <div className={styles.mainFrame}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <Outlet />
          </div>
        </div>
      </div>
      <InfoSide />
    </div>
  );
};

export default MainFrame;
