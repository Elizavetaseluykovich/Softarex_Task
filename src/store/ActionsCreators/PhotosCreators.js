import { GET_PHOTOS, SET_ERROR } from '../types';

export const getPhotosCreator = (arr, page, total_results) => ({type: GET_PHOTOS, payload: {
    photos: arr,
    page,
    total_results
}});
export const setError = (err) => ({type: SET_ERROR, payload: err});