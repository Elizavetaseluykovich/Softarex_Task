import SearchBar from '../SearchBar/SearchBar';
import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import {backgrounds, suggestedList} from '../../store/arrays';
import shuffle from '../../store/shuffleFunc';
import {content} from '../../store/arrays';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {translate} from '../../i18n/index';

const Header = () => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(window.innerWidth >= 700 ? 6 : 3);
    const [arr, setArr] = useState([]);
    let number = Math.floor(Math.random()*5); 
    const {language} = useSelector(state => state.language);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 700) setCount(6);
            else setCount(3);
        })
        return () => window.removeEventListener('resize', () => {
            if (window.innerWidth >= 700) setCount(6);
            else setCount(3);
        })
    }, []);

    useEffect (() => {
        setArr(shuffle(suggestedList, count));
    }, [count]);

    let topics = shuffle(content, 8);

    return (
        <header className={styles.header} style={{background: `url(${backgrounds[number].url}) ${backgrounds[number].position}`}}>
            <section className={styles.content}>
                <h1>{translate("header", language)}</h1>
                <SearchBar top={topics} check={true} language={language}/>
                <div className={styles.suggested}>
                    <ul>
                        <li>{translate("suggested", language)}:</li>
                        <li>
                            <ul>   
                                {arr.map((item, index) => {
                                        return <li key={index}><Link to={`/search/${item}`} className={styles.suggestedItem} onClick={()=> dispatch({type: 'SET_HISTORY', payload: item})}>{translate(`${item}`, language)}</Link></li>;
                                    }
                                )}            
                                <li><Link to={"/categories"}>{translate("more", language)}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <a href={backgrounds[number].authorUrl} className={styles.author} target="_blank" rel="noreferrer">{translate("photo", language)} {backgrounds[number].author}</a>
                </div>
            </section>
        </header>
    )
}

export default Header;
