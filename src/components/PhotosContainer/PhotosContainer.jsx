import styles from './PhotosContainer.module.css';
import ImageItem from '../ImageItem/ImageItem';
import Masonry from 'react-masonry-css'
import Loader from '../Loader/Loader';

const PhotosContainer= ({photos, location}) => {
    return (
        <Masonry 
            breakpointCols={4}
            className={styles.container}>
            {photos ? photos.map((photo) =>
                <ImageItem {...photo} location={location}/>) : <><p>Sorry. Error </p> <Loader/></>} 
        </Masonry>
    )
}

export default PhotosContainer;

