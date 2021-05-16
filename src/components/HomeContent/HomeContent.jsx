import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCuratedPhotos} from '../../store/actions/PhotosActions';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader/Loader';
import { useHistory, useLocation } from 'react-router-dom';

const HomeContent = () => {
    const location = useLocation();
   
    const dispatch = useDispatch();
    const { photos, error } = useSelector((state) => state.photos);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const photosCount = Math.round(window.innerHeight * (window.innerWidth - 100) / (((window.innerWidth - 100) / 4) * 590));

    useEffect (() => {
        setIsFetching(true);
        dispatch(getCuratedPhotos(1, photosCount));
    }, [dispatch]);

    function showMoreTrendingPhotos(){
        setPage(prev => prev + 1);
        setIsFetching(true);
        dispatch(getCuratedPhotos(page + 1, photosCount));
    }
    
    return (
        error ? <p style={{color: 'red'}}>{error}</p> :
        <InfiniteScroll
            dataLength={photos.length}
            next={showMoreTrendingPhotos}
            hasMore={true}>
            <PhotosContainer photos={photos} location={location}/>
            {isFetching ? <Loader/> : ''} 
        </InfiniteScroll>
    )
}

export default HomeContent;