import {Link} from 'react-router-dom';
import styles from './CollectionCard.module.css';

const CollectionCard = ({props, name}) => {

    return (
        <Link to={{pathname: `/${name}/`, state: {props, name}}} className={styles.item}>
            <div className={styles.itemImg}>
               <div className={styles.mainPic}>
                    <img src={props.length > 0 ? props[0].src.medium : 'https://belplit.by/system/product_images/22196/original/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%BE-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9___0112.jpg?1417531171'} alt={props.length > 0 ? props[0].url.substring(29,  props[0].url.lastIndexOf('-')): 'empty'}/>
               </div>
               <div className={styles.imgColl}>
                   <div>
                        <img src={props.length > 1 ? props[1].src.small : 'https://belplit.by/system/product_images/22196/original/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%BE-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9___0112.jpg?1417531171'} alt={props.length > 1 ? props[1].url.substring(29,  props[1].url.lastIndexOf('-')): 'empty'}/>
                   </div>
                   <div>
                    <img src={props.length > 2 ? props[2].src.small : 'https://belplit.by/system/product_images/22196/original/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%BE-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9___0112.jpg?1417531171'} alt={props.length > 2 ? props[2].url.substring(29,  props[2].url.lastIndexOf('-')): 'empty'}/>
                   </div>
                   <div>
                        <img src={props.length > 3 ? props[3].src.small : 'https://belplit.by/system/product_images/22196/original/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%BE-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9___0112.jpg?1417531171'} alt={props.length > 3 ? props[3].url.substring(29,  props[3].url.lastIndexOf('-')): 'empty'}/>
                   </div>
                   <div>
                        <img src={props.length > 4 ? props[4].src.small : 'https://belplit.by/system/product_images/22196/original/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%BE-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9___0112.jpg?1417531171'} alt={props.length > 4 ? props[4].url.substring(29,  props[4].url.lastIndexOf('-')): 'empty'}/>
                   </div>
               </div>
            </div>
            <div className={styles.itemText}>
                <span className={styles.name}>{name}</span>
                <span className={styles.count}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></svg>
                    </i>
                    <span>{props.length}</span>
                </span>
            </div>
        </Link>
    )
}

export default CollectionCard;