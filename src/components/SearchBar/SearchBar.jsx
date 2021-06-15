import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import styles from './SearchBar.module.css';
import SuggestionContainer from '../SuggestionContainer/SuggestionContainer';
import {useHistory} from "react-router-dom";
import {translate} from '../../i18n/index';

const SearchBar = ({top, check, language}) => {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false); 
    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({type: 'SET_HISTORY', payload: search});
        if (search.trim().length) {
            history.push(`/search/${search.trim()}`);
        } 
        setSearch('');
    }

    function submit(e) {
        submitHandler(e);
    }

    function checkFocus(e) {
        e.stopPropagation();
        if (e.target.className && typeof e.target.className.includes !== 'undefined' && (e.target.className.includes('SearchBar') || e.target.parentNode.className.includes('SearchBar'))) setFocus(true);
        else setFocus(false);
    }

    function closeDropDown() {
        window.addEventListener('click', e => checkFocus(e));
        window.removeEventListener('click', e => checkFocus(e));
    }

    return (
        <div className={styles.searchContainer} onClick={closeDropDown}> 
            <form className={styles.form} onSubmit={(e) => submit(e)}>
                <div className={focus && check ? `${styles.formContainer} ${styles.focus}` : `${styles.formContainer}`}>
                    <input type="text" placeholder={`${translate('search', language)}`} onChange={(e)=>setSearch(e.target.value)} className={styles.input} value={search} required/>
                    <button className={styles.btn}>
                        <i className={styles.icon}>
                            <svg className={styles.svgIcon} xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                        </i>
                    </button>
                </div>
                {focus && check ? <SuggestionContainer arr={top} addfocus={() => setFocus(true)} language={language}/> : null }
            </form>
        </div>
    )
}

export default SearchBar;