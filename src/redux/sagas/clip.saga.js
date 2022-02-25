import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClip() {
    try{
        const response = yield axios.get('/api/clip/');
        yield put({type: 'SET_CLIP', payload: response.data});
    } catch (error) {
        console.warn('Failed to fetch clip data', error);
    }
}

function* createClip(action) {
    try {
        const song_id = action.payload.song_id;
        const name = action.payload.name;
        const path = action.payload.path;
        const description = action.payload.description;

        yield axios.post(
            `/api/clip`,
            {
                song_id,
                name,
                path,
                description
            });
        yield put({type: 'FETCH_CLIP'});
    } catch (error) {
        console.warn('Failed to add clip', error);
    }
}

function* addClipComment(action) {
    try {
        const clipId = action.payload.clipId;
        const comment = action.payload.comment;
        yield axios.post(`/api/clip/comment/${clipId}`, {comment: comment});
        yield put({type: 'FETCH_CLIP'});
    } catch (error) {
        console.warn('Failed to add clip comment', error);
    }
}

function* clipSaga() {
    yield takeLatest('FETCH_CLIP', fetchClip);
    yield takeLatest('ADD_CLIP_COMMENT', addClipComment);
    yield takeLatest('CREATE_CLIP', createClip);
}

export default clipSaga;