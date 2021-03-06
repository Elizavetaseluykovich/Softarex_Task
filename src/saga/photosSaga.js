import {put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import {client} from '../store/index.js';
import { setCuratedPhotosCreator, setError, setPhotosCreator } from "../store/ActionsCreators/PhotosCreators";
import { DOWNLOAD_PHOTO, GET_CURATED_PHOTOS, GET_PHOTOS } from "../store/types.js";

const fetchCuratedPhotos = ({page, per_page}) => {
    try {
        return client.photos.curated({page, per_page});
    } catch(e) {
        setError(e);
    }
}

function* workerGetCuratedPhotos(action) {
    const photos = yield call(fetchCuratedPhotos, action.payload);
    yield put(setCuratedPhotosCreator(photos.photos, photos.page));
}

const fetchPhotos = ({page, per_page, query}) => {
    try {
        return client.photos.search({ page, per_page, query});
    } catch(err) {
        setError(err.message);
    }
}

function* workerGetPhotos(action) {
    const photos = yield call(fetchPhotos, action.payload);
    yield put(setPhotosCreator(photos.photos, photos.page, action.payload.isFetching));
}

const downloadPhoto = ({url, photographer, width, height, id}) => {

    axios ({
        method: 'GET',
        url: `${url}?w=${width}&h=${height}`,
        responseType: 'blob'
    }).then((res) => {
        if(res) {
            const url = window.URL.createObjectURL(new Blob([res.data], {type: 'image/jpg'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${photographer}_${id}.jpg`);
            document.body.appendChild(link);
            link.click();
        }
    })
}

function* workerDownloadPhoto(action) {
    yield call(downloadPhoto, action.payload);
}

export function* watcherGetPhotos() {
    yield takeEvery(GET_CURATED_PHOTOS, workerGetCuratedPhotos);
    yield takeEvery(GET_PHOTOS, workerGetPhotos);
    yield takeEvery(DOWNLOAD_PHOTO, workerDownloadPhoto);
}



