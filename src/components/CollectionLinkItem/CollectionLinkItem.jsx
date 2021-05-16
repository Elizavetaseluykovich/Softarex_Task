import styles from './CollectionLinkItem.module.css';

const CollectionLinkItem= () => {
    return (
        <a href="#" className={styles.item}>
            <div className={styles.itemImg}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYHO8FQHWJ5CnsTVd6iIEuH5Zne7oJkYT7Wg&usqp=CAU" alt=""/>
                <img src="https://images.pexels.com/photos/2428824/pexels-photo-2428824.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                <img src="https://images.pexels.com/photos/2428824/pexels-photo-2428824.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
            </div>
            <div className={styles.itemText}>
                <div className={styles.header}>LOVE</div>
                <div className={styles.description}>176 photos</div>
            </div>
        </a>
    )
}

export default CollectionLinkItem;