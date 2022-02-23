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

function* clipSaga() {
    yield takeLatest('FETCH_CLIP', fetchClip);
}

export default clipSaga;