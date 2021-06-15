import React from 'react';
import styles from './TrendingItem.module.css';
import {Link} from 'react-router-dom';
import {translate} from '../../i18n/index';

const TrendingItem = ({link, title, img, onClick, language,  id}) => {
    return (
        <Link to={`/search/${link}`} className={styles.link} key={id} onClick={onClick}>
            <img src={img} alt={title}/>
            <span>{translate(`${title}`, language)}</span>
        </Link>
    )
}

export default TrendingItem;