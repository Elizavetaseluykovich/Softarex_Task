import React from 'react';
import MenuList from '../MenuList/MenuList';
import styles from './Categories.module.css';
import {content} from '../../store/arrays';
import { useDispatch } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';

const Categories = () => {
    const dispatch = useDispatch();
    return (
        <>
            <MenuList/>
            <section className={styles.container}>
                <div className={styles.title}>
                    <h1>Popular Searches</h1>
                    <p>The most popular search terms on Pexels.</p>
                </div>
                <div className={styles.content}>
                    {content.map(item => {
                        const link = item.title.replace(' ', '%20');
                        return (
                        <div className={styles.item} onClick={()=> dispatch({type: 'SET_HISTORY', payload: item.title})}>
                            <Link to={`/search/${link}`}>
                                <h4>{item.title}</h4>
                                <img src={item.img} alt={item.title}/>
                                <span>→</span>
                            </Link>
                        </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Categories;