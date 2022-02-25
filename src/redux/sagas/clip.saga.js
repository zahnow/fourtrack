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
}

export default clipSaga;