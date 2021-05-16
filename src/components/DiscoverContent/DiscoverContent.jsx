import styles from './DiscoverContent.module.css';
import CollectionItem from '../CollectionItem/CollectionItem';

const DiscoverContent = () => {
    return (
        <div className={styles.container}>
            <CollectionItem/>
        </div>
    )
}

export default DiscoverContent;