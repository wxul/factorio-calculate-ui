import React from 'react';
import styles from './index.css';
import Sash from '@/components/sash';
import LeftSide from '@/components/left-side';
import Main from '@/components/main';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Sash
        direction="horizontal"
        renderSide={<LeftSide />}
        defaultSize={300}
        minSize={300}
        maxSize={500}
      >
        <Main />
      </Sash>
    </div>
  );
};

export default Home;
