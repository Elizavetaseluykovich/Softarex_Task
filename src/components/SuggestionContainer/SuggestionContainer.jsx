import { useDispatch, useSelector } from 'react-redux';
import styles from '../SearchBar/SearchBar.module.css';
import RecentSearch from '../RecentSearch/RecentSearch';
import TrendingItem from '../TrendingItem/TrendingItem';
import { content } from '../../store/arrays';
import {translate} from '../../i18n/index';

const SuggestionContainer = ({arr, language}) => {
    const history = useSelector((state) => state.photos.history);
    const dispatch = useDispatch();

    let resultArr = arr ? arr : content.slice(0, 8);

    return (
        <div className={styles.suggestionContainer}>
            {history.length > 0 ? <div className={styles.history}>
                <div className={styles.deleteHistory}>
                    <span className={styles.header}>{translate("recent", language)}</span>
                    <button className={styles.deleteHistoryIcon} onClick={(e) => {e.stopPropagation(); dispatch({type: 'DELETE_HISTORY'})}}>
                        <span></span>
                    </button>
                </div>
                    {history.map((item, index)  => <RecentSearch key={index} text={item}/>)}
            </div> : ''}
            <div className={styles.trending}>
                <span className={styles.header}>{translate("trending", language)}</span>
                <div>
                    {resultArr.map((item) => {
                        const link = item.title.replace(' ', '%20');
                        return (
                        <TrendingItem key={item.id} link={link} title={item.title} img={item.img} language={language} onClick={() =>  dispatch({type: 'SET_HISTORY', payload: link})}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SuggestionContainer;