import styles from './RecentSearch.module.css';
import {Link} from 'react-router-dom';

const RecentSearch = ({text}) => {
    return (
        <Link className={styles.SearchBarLink} to={`/search/${text}`}>
            <span>{text}</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Search->-Suggestions-(Empty-Query)" transform="translate(-558.000000, -114.000000)">
                <g id="Navbar">
                <g id="Popup" transform="translate(457.000000, 33.000000)">
                <g id="Recent-Searches" transform="translate(12.000000, 40.000000)">
                <g id="24px-(3)" transform="translate(84.000000, 38.000000)">
                <path d="M17.5,14 L16.71,14 L16.43,13.73 C17.41,12.59 18,11.11 18,9.5 C18,5.91 15.09,3 11.5,3 C7.91,3 5,5.91 5,9.5 C5,13.09 7.91,16 11.5,16 C13.11,16 14.59,15.41 15.73,14.43 L16,14.71 L16,15.5 L21,20.49 L22.49,19 L17.5,14 Z M11.5,14 C9.01,14 7,11.99 7,9.5 C7,7.01 9.01,5 11.5,5 C13.99,5 16,7.01 16,9.5 C16,11.99 13.99,14 11.5,14 Z" id="Shape" fill="#9E9E9E" fill-rule="nonzero"></path>
                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                </g>
                </g>
                </g>
                </g>
                </g>
                </g>
                </svg>
            </span>
        </Link>
    )
}

export default RecentSearch;