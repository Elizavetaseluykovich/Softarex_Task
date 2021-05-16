import React from 'react';
import styles from './TrendingItem.module.css';
import {Link} from 'react-router-dom';

const TrendingItem = ({link, title, img, onClick}) => {
    return (
        <Link to={`/search/${link}`} className={styles.link} onClick={onClick}>
            <img src={img} alt={title}/>
            <span>{title}</span>
        </Link>
    )
}

export default TrendingItem;