import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import styles from './SearchPage.module.css';
import {getPhotos} from '../../store/actions/PhotosActions';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {history, photos, error} = useSelector((state) => state.photos);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    let search = history[history.length-1];

    const photosCount = Math.round(window.innerHeight * (window.innerWidth - 100) / (((window.innerWidth - 100) / 4) * 590));

    const searchPhotosHandler = (change) => {
        setPage(change ? 1 : page + 1);
        setIsFetching(true);
        dispatch(getPhotos(change ? 1 : page + 1, photosCount, search));
    }

    useEffect(() => {
        searchPhotosHandler(true);
    }, [search])

    return (
        error ? <p>{error}</p> :
        <>
            <section className={styles.header}>
                <h1>{search} photos</h1>
            </section>
            <section className={styles.content}>
                <InfiniteScroll
                    dataLength={photos ? photos.length : null}
                    next={() => searchPhotosHandler(false)}
                    hasMore={isFetching}
                    loader={<Loader/>}>
                    <PhotosContainer photos={photos} location={location}/>
                    {/* {isFetching ? <Loader/> : ''}  */}
                </InfiniteScroll>
            </section>
        </>
    )
}

export default SearchPage;