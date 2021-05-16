import React from 'react';
import styles from './MenuList.module.css';
import {NavLink} from 'react-router-dom';

const MenuList = () => {
    return (
        <div className={styles.menu}>
            <ul>
                <li><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
                <li><NavLink to="/discover" activeClassName={`${styles.active}`}>Selected</NavLink></li>
            </ul>
        </div>
    )
}

export default MenuList;