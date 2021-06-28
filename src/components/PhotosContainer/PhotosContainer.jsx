import styles from './PhotosContainer.module.css';
import ImageItem from '../ImageItem/ImageItem';
import Masonry from 'react-masonry-css'
import Loader from '../Loader/Loader';

const PhotosContainer= ({photos, location}) => { 
    const breakpointColumns = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <Masonry 
            breakpointCols={breakpointColumns}
            className={styles.container}>
            {
                photos ? 
                photos.map((photo, index) =>
                    <>
                        <ImageItem key={index+photo.id} {...photo} location={location}  />
                    </>
                    )
                : <><p>Sorry. Error </p> <Loader/></>
            } 
        </Masonry>
    )
}

export default PhotosContainer;

