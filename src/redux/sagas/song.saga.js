import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSong() {
    try{
        const response = yield axios.get('/api/song');
        console.log('song response:', response);
        yield put({type: 'SET_SONG', payload: response.data});
    } catch (error) {
        console.warn('Failed to fetch song data', error);
    }
}

function* songSaga() {
    yield takeLatest('FETCH_SONG', fetchSong);
}

export default songSaga;