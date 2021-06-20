import { SET_PHOTOS, SET_ERROR, GET_CURATED_PHOTOS, 
        SET_CURATED_PHOTOS, GET_PHOTOS, SET_IS_FETCHING, 
        DOWNLOAD_PHOTO, LIKE_PHOTO, COLLECTION} from '../types';

export const getCuratedPhotosCreator = (page, per_page) => ({type: GET_CURATED_PHOTOS, payload: {page, per_page}});

export const setCuratedPhotosCreator = (arr, page) => ({type: SET_CURATED_PHOTOS, payload: {curatedPhotos: arr, page}});

export const getPhotosCreator = (page, per_page, query, isFetching) => ({type: GET_PHOTOS, payload: {page, per_page, query, isFetching}});

export const setPhotosCreator = (arr, pageP, isFetching) => ({type: SET_PHOTOS, payload: {photos: arr, pageP, isFetching}});

export const downloadPhotoCreator = (url, photographer, id, width, height) => ({type: DOWNLOAD_PHOTO, payload: {url, photographer, width, height, id}});

export const setError = (err) => ({type: SET_ERROR, payload: err});

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, payload: isFetching});

export const setLikePhoto = (id) => ({type: LIKE_PHOTO, payload: id});

export const PhotoCollection = (id) => ({type: COLLECTION, payload: id})
