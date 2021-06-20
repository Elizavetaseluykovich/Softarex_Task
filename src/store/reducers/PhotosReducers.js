import { SET_ERROR, SET_HISTORY, DELETE_HISTORY, LIKE_PHOTO, COLLECTION, SET_CURATED_PHOTOS, SET_PHOTOS, SET_IS_FETCHING} from '../types';

const initialState= {
    photos: [],
    curatedPhotos: [],
    total_results: 0,
    page: 1, 
    pageP: 1, 
    history: JSON.parse(localStorage.getItem('history')) || [],
    likes: JSON.parse(localStorage.getItem('likes')) || [],
    collection: JSON.parse(localStorage.getItem('collection')) || [],
    isFetching: true,
    error: ''
}

const photoReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_CURATED_PHOTOS:
            const { curatedPhotos, page } = action.payload;
            let curatedPhotosArr = [];
            if (page > 1) {
                curatedPhotosArr = [...state.curatedPhotos, ...curatedPhotos];
            } else {
                curatedPhotosArr = curatedPhotos;
            }
            return {
                ...state,
                curatedPhotos: curatedPhotosArr,
                photos: [],
                page: page
            }
        case SET_PHOTOS:
            const { photos, pageP } = action.payload;
            let photosArr = [];
            if (pageP > 1) {
                photosArr = [...state.photos, ...photos];
            } else {
                photosArr = photos;
            }
            return {
                ...state,
                photos: photosArr,
                isFetching: false,
                pageP
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
                if (state.photos.length === 0) {
                    state.curatedPhotos.forEach((item) => {
                        if (item.id === action.payload) {
                            newLikes.push({...item});
                        }
                    })
                } else {
                    state.photos.forEach((item) => {
                        if (item.id === action.payload) {
                            newLikes.push({...item});
                        }
                    })
                }
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
                if (state.photos.length === 0) {
                    state.curatedPhotos.forEach((item) => {
                        if (item.id === action.payload) {
                            newcollection.unshift({...item});
                        }
                    })
                } else {
                    state.photos.forEach((item) => {
                        if (item.id === action.payload) {
                            newcollection.unshift({...item});
                        }
                    })
                }
            }
            localStorage.setItem('collection', JSON.stringify(newcollection));
            return {
                ...state,
                collection:  JSON.parse(localStorage.getItem('collection')) 
            }
        case SET_ERROR:
            return {
                ...state,
                photos: {},
                error: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export default photoReducer;
