import PhotosContainer from '../PhotosContainer/PhotosContainer';
import styles from './PhotoPage.module.css';
import {useLocation} from "react-router-dom";
import { useSelector } from 'react-redux';
import {translate} from '../../i18n/index';

const PhotoPage = () => {
    const location = useLocation();
    const {collection} = useSelector(state => state.photos);
    const {language} = useSelector(state => state.language);

    return (
        collection.length === 0 ? <h2 className={styles.error}>{translate('empty', language)}</h2> :
        <>
            <section className={styles.header}>
                <h1>{translate("collection", language)} </h1> 
            </section>
            <section className={styles.content}>
                <PhotosContainer photos={collection} location={location}/>
            </section>
        </>
    )
}

export default PhotoPage;