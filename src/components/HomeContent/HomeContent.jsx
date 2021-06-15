import {useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCuratedPhotos} from '../../store/actions/PhotosActions';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router-dom';

const HomeContent = () => {
    const location = useLocation();
   
    const dispatch = useDispatch();
    const { photos, error } = useSelector((state) => state.photos);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const photosCount = Math.round(window.innerHeight * (window.innerWidth - 100) / (((window.innerWidth - 100) / 4) * 590));

    useEffect (() => {
        setIsFetching(true);
        dispatch(getCuratedPhotos(page, 10));
    }, [dispatch, page]);

    function showMoreTrendingPhotos(){
        setPage(prev => prev + 1);
        setIsFetching(true);
        dispatch(getCuratedPhotos(page + 1, photosCount));
    }

    let bottomBoindaryRef = useRef(null);
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        setPage(prev => prev + 1);
                    }
                })
            }).observe(node);
        }, []
    )

    useEffect(() => {
        if (bottomBoindaryRef.current) {
            scrollObserver(bottomBoindaryRef.current);
        }
    }, [scrollObserver], [bottomBoindaryRef])

    return (
        <>
            {error ? <p style={{color: 'red'}}>{error}</p> :
            <InfiniteScroll
                dataLength={photos.length}
                next={showMoreTrendingPhotos}
                hasMore={true}>
                <PhotosContainer photos={photos} location={location}/>
                {isFetching ? <Loader/> : ''} 
            </InfiniteScroll>}
        </>
    )
}

export default HomeContent;