import {useState, useEffect, useCallback} from 'react';
import styles from './Modal.module.css';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {translate} from '../../i18n/index';
import {downloadPhotoCreator, setLikePhoto, PhotoCollection} from '../../store/ActionsCreators/PhotosCreators.js';

const Modal = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [zoom, setZoom] = useState(false);
    const [transform, setTransform] = useState('');
    const {likes, collection} = useSelector((state) => state.photos);
    const {language} = useSelector(state => state.language);
    const [list, setList] = useState(false);
    const location = useLocation();
    const {src, photographer_url, photographer, width, height, id, url, avg_color} = location.state;
    const [activeItem, setActiveItem] = useState({active: true, id: '1', width: width, height:height});

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    }, [])

    function find(arr, id) {
        return arr.some(item => {
            return item.id === id
        })
    }
 
    const CallBackZoom = useCallback ((e) => { 
        let mouseX = (window.innerWidth/2 - e.clientX)/10,
            mouseY = (window.innerHeight/2 - e.clientY)/10;
        setTransform(`scale(3) translate3d(${mouseX}%, ${mouseY}%, 0px)`);
    }, [])

    const hoverCallback = useCallback ((e) => {
        if (e.target.className === styles.list) {
            setList(true);
        } else setList(false);
    }, [])

    function addEvent() {
        setTransform('scale(3)');
        window.addEventListener('mousemove', CallBackZoom);
    }

    function removeEvent() {
        window.removeEventListener('mousemove', CallBackZoom);
    }

    function setActiveLi(e, height, width) {
        setActiveItem({active: true, id: e.target.id, height: height, width: width });
    }

    function closeModal(e) {
        e.stopPropagation(); history.goBack();
    }

    useEffect(() => {
        if (!zoom) {
            setTransform('none');
            removeEvent();
        }
        else if (zoom) addEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom]);

    useEffect(() => {
        window.addEventListener('mouseover', hoverCallback);
        return window.addEventListener('mouseover', hoverCallback)
    }, [hoverCallback])
    
    return (
        <div className={styles.window} onClick={(e) => e.target.className === styles.window ? closeModal(e) : null}>
            <div className={styles.btnClose} onClick={(e) => closeModal(e)}><span></span></div>
            <div className={styles.content}>
                <section className={styles.header}>
                    <section className={styles.author}>
                        <a href={photographer_url} target='_blank' rel="noreferrer">
                            <span className={styles.authorPic} style={{background: `${avg_color}`}}></span>
                            <span className={styles.text}>
                                <p>{photographer}</p>
                            </span>
                        </a>
                    </section>
                   <section className={styles.btns}>
                        <button className={find(likes, id) ? `${styles.btnlike} ${styles.btnlikeActive}` : styles.btnlike} onClick={e => {e.preventDefault(); dispatch(setLikePhoto(id))}}>
                            <i className={styles.likeIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
                            </i>
                            <i className={styles.activeIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                            </i>
                            <span>{translate("like", language)}</span>
                        </button>
                        <button className={styles.btnAdd} onClick={e => {e.preventDefault(); dispatch(PhotoCollection(id))}}>
                            {find(collection, id) ? 
                                <i className={styles.added}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </i> :
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                                </i> 
                            }
                            <span>{translate("collect", language)}</span>
                        </button>
                        <div className={styles.btnDownload}>
                            <span onClick={() => dispatch(downloadPhotoCreator(src.original, photographer, id))}>{translate("download", language)}</span>
                            <span className={styles.list} onClick={() => setList(!list)}></span>
                        </div>
                        <div className={list ? `${styles.dropdown} ${styles.active}` : styles.dropdown}>
                            <div className={styles.dropdownContainer} >
                                <form >
                                    <h3>{translate("choose", language)}:</h3>
                                    <ul>
                                        <li onClick={e => {setActiveLi(e, height, width)}} id='1' className={activeItem.active & (activeItem.id === '1' || activeItem.id === 'first') ? styles.activeItem : ''}>
                                            <label>  
                                                <input type="radio" name="size" id="first" checked={activeItem.active & (activeItem.id === '1'  || activeItem.id === 'first')  ? true : false}/>
                                                <span className={styles.name}>{translate("original", language)}</span>
                                                <span> {width} x {height}</span>
                                            </label>
                                        </li>
                                        <li onClick={e => {setActiveLi(e, Math.floor((height/width)*1920), 1920)}} id='2' className={activeItem.active & (activeItem.id === '2' || activeItem.id === 'second') ? styles.activeItem : ''}>
                                            <label>  
                                                <input type="radio" name="size" id="second" checked={activeItem.active & (activeItem.id === '2' || activeItem.id === 'second') ? true : false}/>
                                                <span className={styles.name}>{translate("large", language)}</span>
                                                <span> {1920} x {Math.floor((height/width)*1920)}</span>
                                            </label>
                                        </li>
                                        <li onClick={e => {setActiveLi(e, Math.floor((height/width)*1280), 1280)}} id='3' className={activeItem.active & (activeItem.id === '3' || activeItem.id === 'third') ? styles.activeItem : ''}>
                                            <label>
                                                <input type="radio" name="size" id="third" checked={activeItem.active & (activeItem.id === '3' || activeItem.id === 'third') ? true : false}/>
                                                <span className={styles.name}>{translate("medium", language)}</span> 
                                                <span> {1280} x {Math.floor((height/width)*1280)} </span>
                                            </label>
                                        </li>
                                        <li onClick={e => {setActiveLi(e, Math.floor((height/width)*640), 640)}} id='4' className={activeItem.active & (activeItem.id === '4' || activeItem.id === 'fourth') ? styles.activeItem : ''}>
                                            <label>
                                                <input type="radio" name="size" id="fourth" checked={activeItem.active & (activeItem.id === '4' || activeItem.id === 'fourth') ? true : false}/>
                                                <span className={styles.name}>{translate("small", language)}</span>
                                                <span> {640} x {Math.floor((height/width)*640)}</span>
                                            </label>
                                        </li>
                                    </ul>
                                    <span className={styles.dropdownBtn} ><button  onClick={(e) => {e.preventDefault(); dispatch(downloadPhotoCreator(src.original, photographer, id, activeItem.width, activeItem.height))}}>{translate("download", language)}</button></span>
                                </form>
                            </div>
                        </div>
                   </section>
                </section>
                <section className={styles.image} onClick={() => setZoom(!zoom)} style={zoom ? {cursor: 'zoom-out'} : {cursor: 'zoom-in'}}>
                    <div className={styles.imageContainer}>
                        <img 
                        style={transform ? {transform : transform} : {}} className={zoom ? `${styles.zoomImg} ${styles.mainImg}` : styles.mainImg} src={src.original} alt={url.substring(29, url.lastIndexOf('-'))}
                        srcSet={`${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500 500w, ${src.original}?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500 1000w`}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Modal;