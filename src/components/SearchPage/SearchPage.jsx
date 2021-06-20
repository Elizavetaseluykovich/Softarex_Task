import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import styles from './SearchPage.module.css';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router-dom';
import {translate} from '../../i18n/index';
import { getPhotosCreator, setIsFetching } from '../../store/ActionsCreators/PhotosCreators';

const SearchPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {photos, error, isFetching} = useSelector((state) => state.photos);
    const {language} = useSelector(state => state.language);
    const [page, setPage] = useState(1);
    let search = location.pathname.slice(8);
    let header = search[0].toUpperCase() + search.slice(1);

    const photosCount = Math.round(window.innerHeight * (window.innerWidth - 100) / (((window.innerWidth - 100) / 4) * 590));

    const searchPhotosHandler = (change) => {
        setPage(change ? 1 : page + 1);
        dispatch(setIsFetching(true));
        dispatch(getPhotosCreator(change ? 1 : page + 1, 10, search, false));
    }

    useEffect(() => {
        searchPhotosHandler(true);
    }, [search])

    return (
        error ? <p>{error}</p> :
        <>
            <section className={styles.header}>
                {language === 'RU' ? 
                    <h1>{translate("photos", language)} "{header}"</h1>
                    :<h1>{header} {translate("photos", language)} </h1>
                }
            </section>
            <section className={styles.content}>
                {isFetching && photos.length === 0 ? <Loader/> : 
                    photos.length > 0 ?
                    <InfiniteScroll
                        dataLength={photos ? photos.length : null}
                        next={() => searchPhotosHandler(false)}
                        hasMore={true}
                        loader={<Loader/>}>
                        <PhotosContainer photos={photos} location={location}/>
                    </InfiniteScroll> :
                        <p className={styles.notFound}>{translate('notFound', language)} "{header}"</p>
                }
            </section>
        </>
    )
}

export default SearchPage;