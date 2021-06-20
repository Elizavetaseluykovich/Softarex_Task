import {all} from 'redux-saga/effects';
import { watcherGetPhotos } from './photosSaga';

export function* rootWatcher() {
    yield all([watcherGetPhotos()]);
}