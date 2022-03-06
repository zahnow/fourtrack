import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClip() {
    try {
        const response = yield axios.get('/api/clip/');
        yield put({ type: 'SET_CLIP', payload: response.data });
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
        yield put({ type: 'UPDATE_SONG', payload: {songId: song_id}})
        yield put({ type: 'FETCH_CLIP' });
    } catch (error) {
        console.warn('Failed to add clip', error);
    }
}

function* addClipComment(action) {
    try {
        const clipId = action.payload.clipId;
        const comment = action.payload.comment;
        yield axios.post(`/api/clip/comment/${clipId}`, { comment: comment });
        yield put({ type: 'FETCH_CLIP' });
    } catch (error) {
        console.warn('Failed to add clip comment', error);
    }
}

function* deleteClip(action) {
    try {
        const clipId = action.payload.clipId;
        yield axios.delete(`/api/clip/${clipId}`);
        yield put({ type: 'FETCH_CLIP' });
    } catch (error) {
        console.warn('Failed to delete clip', error);
    }
}

function* deleteClipComment(action) {
    try {
        const commentId = action.payload.commentId;
        yield axios.delete(`/api/clip/comment/${commentId}`);
        yield put({ type: 'FETCH_CLIP' });
    } catch (error) {
        console.warn('Failed to delete clip comment', error);
    }
}

function* addClipToFavorites(action) {
    try {
        const clipId = action.payload.clipId;
        yield axios.post(`/api/clip/favorite/${clipId}`);
        yield put({type: 'FETCH_CLIP'}); 
    } catch (error) {
        console.warn('Failed to add favorite', error);
    }
}

function* removeClipFromFavorites(action) {
    try {
        const clipId = action.payload.clipId;
        yield axios.delete(`/api/clip/favorite/${clipId}`);
        yield put({type: 'FETCH_CLIP'}); 
    } catch (error) {
        console.warn('Failed to remove favorite', error);
    }
}

function* clipSaga() {
    yield takeLatest('FETCH_CLIP', fetchClip);
    yield takeLatest('ADD_CLIP_COMMENT', addClipComment);
    yield takeLatest('CREATE_CLIP', createClip);
    yield takeLatest('DELETE_CLIP', deleteClip);
    yield takeLatest('DELETE_CLIP_COMMENT', deleteClipComment);
    yield takeLatest('ADD_CLIP_TO_FAVORITES', addClipToFavorites);
    yield takeLatest('REMOVE_CLIP_FROM_FAVORITES', removeClipFromFavorites);
}

export default clipSaga;