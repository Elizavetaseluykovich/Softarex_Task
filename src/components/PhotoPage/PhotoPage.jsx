import PhotosContainer from '../PhotosContainer/PhotosContainer';
import styles from './PhotoPage.module.css';
import {useLocation} from "react-router-dom";


const SearchPage = () => {
    const location = useLocation();
    const {props, name} = location.state;

    return (
        props.length === 0 ? <h2 className={styles.error}>Oh, sorry :(  It's empty. </h2> :
        <>
            <section className={styles.header}>
                <h1>{name}</h1>
            </section>
            <section className={styles.content}>
                <PhotosContainer photos={props} location={location}/>
            </section>
        </>
    )
}

export default SearchPage;