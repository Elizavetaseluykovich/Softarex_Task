import styles from './Categories.module.css';
import {content} from '../../store/arrays';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {translate} from '../../i18n/index';

const Categories = () => {
    const dispatch = useDispatch();
    const {language} = useSelector(state => state.language);

    return (
        <>
            <section className={styles.container}>
                <div className={styles.title}>
                    <h1>{translate("popular", language)}</h1>
                    <p>{translate("popularText", language)}</p>
                </div>
                <div className={styles.content}>
                    {content.map(item => {
                        const link = item.title.replace(' ', '%20');
                        return (
                        <div key={item.id} className={styles.item} onClick={()=> dispatch({type: 'SET_HISTORY', payload: item.title})}>
                            <Link to={`/search/${link}`}>
                                <h4>{translate(`${item.title}`, language)}</h4>
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