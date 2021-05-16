import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';
import {backgrounds, suggestedList} from '../../store/arrays';
import shuffle from '../../store/shuffleFunc';
import {content} from '../../store/arrays';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    let number = Math.floor(Math.random()*5); 

    let arr = shuffle(suggestedList, 6);
    let topics = shuffle(content, 8);

    return (
        <header className={styles.header} style={{background: `url(${backgrounds[number].url}) ${backgrounds[number].position}`}}>
            <section className={styles.content}>
                <h1>The best free stock photos & videos shared by talented creators.</h1>
                <SearchBar top={topics} check={true} />
                <div className={styles.suggested}>
                    <ul>
                        <li>Suggested:</li>
                        <li>
                            <ul>   
                                {arr.map((item, index) => {
                                        return <li key={index}><Link to={`/search/${item}`} className={styles.suggestedItem} onClick={()=> dispatch({type: 'SET_HISTORY', payload: item})}>{item}</Link></li>;
                                    }
                                )}            
                                <li><Link to={"/categories"}>more</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <a href={backgrounds[number].authorUrl} className={styles.author} target="_blank" rel="noreferrer">Photo by {backgrounds[number].author}</a>
                </div>
            </section>
        </header>
    )
}

export default Header;
