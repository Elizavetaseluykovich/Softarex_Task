import { useDispatch, useSelector } from 'react-redux';
import styles from '../SearchBar/SearchBar.module.css';
import RecentSearch from '../RecentSearch/RecentSearch';
import TrendingItem from '../TrendingItem/TrendingItem';
import { content } from '../../store/arrays';

const SuggestionContainer = ({arr}) => {
    const history = useSelector((state) => state.photos.history);
    const dispatch = useDispatch();

    let resultArr = arr ? arr : content.slice(0, 8);

    return (
        <div className={styles.suggestionContainer}>
            {history.length > 0 ? <div className={styles.history}>
                <div className={styles.deleteHistory}>
                    <span className={styles.header}>Recent searches</span>
                    <button className={styles.deleteHistoryIcon} onClick={(e) => {e.stopPropagation(); dispatch({type: 'DELETE_HISTORY'})}}>
                        <span></span>
                    </button>
                </div>
                    {history.map((item)  => <RecentSearch text={item}/>)}
            </div> : ''}
            <div className={styles.trending}>
                <span className={styles.header}>Trending Topics</span>
                <div>
                    {resultArr.map((item) => {
                        const link = item.title.replace(' ', '%20');
                        return (
                        <TrendingItem link={link} title={item.title} img={item.img} onClick={() =>  dispatch({type: 'SET_HISTORY', payload: link})}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SuggestionContainer;