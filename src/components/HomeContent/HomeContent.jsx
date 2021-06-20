import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router-dom';
import { getCuratedPhotosCreator } from '../../store/ActionsCreators/PhotosCreators';

const HomeContent = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { curatedPhotos, error } = useSelector((state) => state.photos);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const photosCount = Math.round(window.innerHeight * (window.innerWidth - 100) / (((window.innerWidth - 100) / 4) * 590));

    useEffect (() => {
        setIsFetching(true);
        dispatch(getCuratedPhotosCreator(page, 10))
    }, [dispatch, page, photosCount]);

    function showMoreTrendingPhotos(){
        setPage(prev => prev + 1);
    }

    return (
        <>
            {error ? <p style={{color: 'red'}}>{error}</p> :
            <InfiniteScroll
                dataLength={curatedPhotos.length}
                next={showMoreTrendingPhotos}
                hasMore={true}>
                <PhotosContainer photos={curatedPhotos} location={location}/>
                {isFetching ? <Loader/> : ''} 
            </InfiniteScroll>}
        </>
    )
}

export default HomeContent;