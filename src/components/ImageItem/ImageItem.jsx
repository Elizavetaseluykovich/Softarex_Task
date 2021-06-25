import {useRef, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ImageItem.module.css';
import {Link} from "react-router-dom";
import IntersectionObserver from "intersection-observer-polyfill";
import { downloadPhotoCreator, setLikePhoto,  PhotoCollection} from '../../store/ActionsCreators/PhotosCreators.js';

const ImageItem = ({url, src, photographer_url, photographer, id, width, height, location, avg_color}) => {
    const {likes, collection} = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const imgRef = useRef();

    const options = {
        root: null, 
        rootMargin: '10px',
        threshold: 0.1
    };

    const observer = useCallback(
        node => {
            new IntersectionObserver((myImg, observer) => {
                myImg.forEach(item => {
                    if (item.intersectionRatio > 0) {
                        item.target.srcset = item.target.dataset.srcset;
                        // console.log(item.target.dataset.srcset);
                        observer.unobserve(item.target);
                    }
                })
            }
        , options).observe(node);
        },
        []
    )
   
    useEffect(() => {
        if (imgRef.current) observer(imgRef.current);
    }, [observer])  
   
    function find(arr, id) {
        return arr.some((item) => {
            return item.id === id
        })
    }

    const pathname = location.pathname === '/' ? '' : location.pathname

    return (
        <Link className={styles.link} to={{pathname: `${pathname}/photo/${id}/`, state: {url, src, photographer, photographer_url, id, width, height, avg_color, background: location, like: find(likes, id)}}} >
            <div className={styles.col} >
                <article style={{background: `${avg_color}`}}>
                        <img 
                            // srcSet={`${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500 500w, ${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500 1000w`}
                            // srcSet=''
                            data-srcset={`${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500 500w, ${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500 1000w`} 
                            ref={imgRef} alt='' src='' 
                            className={styles.mainImg} width={width} height={height}
                        />
                        <div className={find(collection, id) || find(likes, id) ? 
                                `${styles.imageBtns} ${styles.active} 
                                ${find(collection, id) ? styles.collection : ''}  
                                ${find(likes, id) ? styles.like: ''}  
                                ${find(collection, id) && find(likes, id)? styles.all : ''} }` 
                                : `${styles.imageBtns}`}>
                            <ul>
                                <li>
                                    <a href={photographer_url} className={styles.author} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                                        <div className={styles.authorPic} style={{background: `${avg_color}`}} alt={photographer}></div>
                                        <span>{photographer}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href=" " className={styles.downloadIcon} target="_blank" rel="noopener noreferrer" onClick={(e) => {e.preventDefault();dispatch(downloadPhotoCreator(src.original, photographer, id))}}>
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" fill="#000000" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" ><g><path d="M72.2,43.2L58,57.4V17c0-2.2-1.8-4-4-4s-4,1.8-4,4v40.4L35.8,43.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l21,21   C52,70.7,53,71,54,71s2-0.4,2.8-1.2l21-21c1.6-1.6,1.6-4.1,0-5.7C76.3,41.6,73.8,41.6,72.2,43.2z"></path><path d="M32,87h44c2.2,0,4-1.8,4-4s-1.8-4-4-4H32c-2.2,0-4,1.8-4,4S29.8,87,32,87z"></path></g>
                                            </svg>
                                        </i>
                                    </a>
                                    <button className={styles.addToCollectionIcon} onClick={(e) => {e.preventDefault(); dispatch(PhotoCollection(id))}}>
                                        {find(collection, id) ? 
                                            <i> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                            </i> :
                                            <i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                                            </i> 
                                        }
                                    </button>
                                    <button className={styles.likeIcon} onClick={(e) => {e.preventDefault(); dispatch(setLikePhoto(id))}}>
                                        {find(likes, id) ? 
                                            <i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                                            </i> :
                                            <i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                </svg>
                                            </i> 
                                        }
                                    </button>
                                </li>
                            </ul>
                        </div>
                </article>
            </div>
        </Link>
    )
}

export default ImageItem;