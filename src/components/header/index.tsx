import React, { FC } from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import NavLink from 'umi/navlink';
import classnames from 'classnames';

const Header: FC = (props) => {

    return (
        <div className={styles.header}>
            <img className={styles['header-logo']} src="/images/Factorio-logo.png" alt="logo" />
            <span className={styles['header-title']}>{formatMessage({ id: 'title' })}</span>
            <div className={styles['link-group']}>
                <NavLink className={styles['link-item-home']} exact={true} activeClassName={styles['link-active-item']} to="/">{formatMessage({ id: 'home' })}</NavLink>
                <NavLink className={styles['link-item-settings']} exact={true} activeClassName={styles['link-active-item']} to="/settings">{formatMessage({ id: 'settings' })}</NavLink>
            </div>
        </div>
    );
}

export default Header;
