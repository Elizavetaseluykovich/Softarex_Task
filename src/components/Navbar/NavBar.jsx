import { useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import styles from './NavBar.module.css';
import { useSelector, useDispatch} from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import {setLanguage} from '../../store/actions/LangActions';
import {translate} from '../../i18n/index';


const NavBar = ({active}) => {
    const [navbar, setNavbar] = useState(active);
    const {language} = useSelector(state => state.language)
    const dispatch = useDispatch();
    
    function setBgNavBar() {
        if(window.scrollY >= 90) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', setBgNavBar);

    return (
       <>
            <nav className={navbar || active ? `${styles.nav} ${styles.active}` : `${styles.nav}`}>
                <Link to="/" className={styles.navLogo}>
                    <div className={styles.navLogoImg}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32">
                            <path d="M2 0h28a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#05A081"></path>
                            <path d="M13 21h3.863v-3.752h1.167a3.124 3.124 0 1 0 0-6.248H13v10zm5.863 2H11V9h7.03a5.124 5.124 0 0 1 .833 10.18V23z" fill="#fff"></path>
                        </svg>
                    </div>
                    <div className={styles.navLogoText}>Pexels</div>
                </Link>
                <div className="form">
                    <div className={styles.formContainer}>
                        <SearchBar check={false} language={language}/>
                    </div>
                </div>
                <ul className={styles.btns}>
                    <li>
                        <NavLink to="/collection" activeClassName={`${styles.activeCollection}`}>{translate("collection", language)}</NavLink>
                    </li>
                    <li onClick={() => dispatch(setLanguage('RU'))}>
                        RU
                    </li>
                    <li onClick={() => dispatch(setLanguage('EN'))}>
                        EN
                    </li>
                </ul>
            </nav>
            <div className={styles.padding}></div>
        </>
    )
}

export default NavBar;