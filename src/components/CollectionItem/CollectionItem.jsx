import React from 'react';
import styles from './CollectionItem.module.css';
import CollectionCard from '../CollectionCard/CollectionCard';
import { useSelector } from 'react-redux';

const CollectionItem= () => {
    const {likes, collection} = useSelector(state => state.photos);

    return (
        <div className={styles.collectionRow}>
            <h3>Your selected photos</h3>
            <div className={styles.items}>
                <CollectionCard props={collection} name={'collection'}/>
                <CollectionCard props={likes} name={'likes'}/>
            </div>
        </div>
    )
}

export default CollectionItem;