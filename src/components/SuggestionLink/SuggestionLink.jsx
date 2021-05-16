import React from 'react';
import styles from './SuggestionLink.module.css';

const SuggestionLink = () => {
    return (
        <a href="#" className={styles.link}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"/>
            <span>Some</span>
        </a>
    )
}

export default SuggestionLink;