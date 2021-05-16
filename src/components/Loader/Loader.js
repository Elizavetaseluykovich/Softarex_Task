import styles from './Loader.module.css';

function Loader () {
    return (
        <div className={styles.container}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
        </div>
    )
}

export default Loader;