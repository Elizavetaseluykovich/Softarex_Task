import { GET_PHOTOS, SET_ERROR, SET_HISTORY, DELETE_HISTORY, LIKE_PHOTO, COLLECTION} from '../types';

const initialState= {
    photos: [],
    total_results: 0,
    page: 1, 
    history: JSON.parse(localStorage.getItem('history')) || [],
    likes: JSON.parse(localStorage.getItem('likes')) || [],
    collection: JSON.parse(localStorage.getItem('collection')) || [],
    error: ''
}

const photoReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_PHOTOS:
            const { photos, page, total_results} = action.payload;
            let photosArr = [];
            if (page > 1) {
                photosArr = [...state.photos, ...photos];
            } else {
                photosArr = photos;
            }
            return {
                ...state,
                photos: photosArr,
                total_results,
                page: page
            }
        case SET_HISTORY:
            const history = action.payload.replace('%20', ' ');
            let newHistory = [];
            if (state.history.includes(history)) {
                newHistory = state.history;
            } else newHistory = [...state.history, history];
            if (newHistory.length === 10) newHistory.shift();
            localStorage.setItem('history', JSON.stringify(newHistory));
            return {
                ...state,
                history: JSON.parse(localStorage.getItem('history'))
            }
        case DELETE_HISTORY: 
            localStorage.removeItem('history');
            return {
                ...state,
                history: []
            }
        case LIKE_PHOTO: 
            let newLikes = [...state.likes];
            let indexFind = 0, check = false;
            newLikes.forEach((item, index) => {
                if (item.id === action.payload) {
                    check = true;
                    indexFind = index;
                }
            })
            if (check) newLikes.splice(indexFind, 1);
            else if (!check) {
                state.photos.forEach((item) => {
                    if (item.id === action.payload) {
                        newLikes.push({...item});
                    }
                })
            }
            localStorage.setItem('likes', JSON.stringify(newLikes));
            return {
                ...state,
                likes: JSON.parse(localStorage.getItem('likes')) 
            }
        case COLLECTION: 
            let newcollection = [...state.collection];
            let imageIndex = 0, checking = false;
            newcollection.forEach((item, index) => {
                if (item.id === action.payload) {
                    checking = true;
                    imageIndex = index;
                }
            })
            if (checking) newcollection.splice(imageIndex, 1);
            else if (!checking) {
                state.photos.forEach((item) => {
                    if (item.id === action.payload) {
                        newcollection.unshift({...item});
                    }
                })
            }
            localStorage.setItem('collection', JSON.stringify(newcollection));
            return {
                ...state,
                collection:  JSON.parse(localStorage.getItem('collection')) 
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default photoReducer;
