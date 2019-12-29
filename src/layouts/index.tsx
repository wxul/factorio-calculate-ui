import React from 'react';
import styles from './index.css';
import Header from '@/components/header';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default BasicLayout;
