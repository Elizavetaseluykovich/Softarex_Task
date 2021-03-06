import { createStore, applyMiddleware, combineReducers } from 'redux';
import photoReducer from './reducers/PhotosReducers';
import langReducer from './reducers/LangReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import {rootWatcher} from '../saga';
import { createClient } from 'pexels';
export const client = createClient('563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf');

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    photos: photoReducer,
    language: langReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

export default store;

sagaMiddleware.run(rootWatcher);