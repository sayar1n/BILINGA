import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import Header from '../Header/Header';
import InfoSide from '../InfoSide/InfoSide';
import styles from './MainFrame.module.scss';

const MainFrame = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('games');

  const handleItemSelect = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  return (
    <div className={styles.mainFrame}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <Outlet context={{ onItemSelect: handleItemSelect }} />
          </div>
        </div>
      </div>
      <InfoSide item={selectedItem} type={selectedType} />
    </div>
  );
};

export default MainFrame;
