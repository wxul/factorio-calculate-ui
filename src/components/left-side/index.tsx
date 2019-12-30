import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { formatMessage } from 'umi-plugin-locale';
import { useSelector } from 'dva';
import styles from './index.css';

const LeftSide: React.FC = () => {
    return (
        <div className={styles.left}>
            <div className={styles['left-header']}>{formatMessage({ id: 'select' })}</div>
            <Scrollbars className={styles.scroller}>
                <div style={{ height: 2000 }}>123</div>
            </Scrollbars>
        </div>
    );
}

export default LeftSide;
