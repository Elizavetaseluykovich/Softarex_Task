import {getPhotosCreator} from '../ActionsCreators/PhotosCreators'; 
import {client} from '../index';
import axios from 'axios';

export const getPhotos = (page, per_page, query) => {
    return async (dispatch) => {
        try {
            const photos = await client.photos.search({ page, per_page, query});

            if("error" in photos) {
                throw new Error(photos.error);
            } else {
                dispatch(getPhotosCreator(photos.photos, page, photos.total_results));
            }
        } catch(err) {
            dispatch(setError(err.message));
        }
    }
};

export const getCuratedPhotos = (page, per_page) => {
    return async (dispatch) => {
        try {
            const photos = await client.photos.curated({ page, per_page });
            if("error" in photos) {
                throw new Error(photos.error);
            } else {
                dispatch(getPhotosCreator(photos.photos, page, photos.total_results));
            }
        } catch(err) {
            dispatch(setError(err.message));
        }
    }
}

export const downloadPhoto = (url, photographer, width, height) => {
    axios({
        method: 'GET',
        url: `${url}?w=${width}&h=${height}`,
        responseType: 'blob'
    }).then((res) => {
        if(res) {
            const url = window.URL.createObjectURL(new Blob([res.data], {type: 'image/jpg'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${photographer}.jpg`);
            document.body.appendChild(link);
            link.click();
        }
    })
}

export const setLikePhoto = (id) => {
    return {
        type: 'LIKE_PHOTO',
        payload: id
    }
}

export const PhotoCollection = (id) => {
    return {
        type: 'COLLECTION',
        payload: id
    }
}

export const setError = (err) => {
    return {
      type: 'SET_ERROR',
      payload: err
    }
}