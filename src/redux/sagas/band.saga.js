import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBand() {
    try{
        const response = yield axios.get('/api/band');
        yield put({type: 'SET_BAND', payload: response.data});
    } catch (error) {
        console.warn('Failed to fetch band data', error);
    }
}

function* bandSaga() {
    yield takeLatest('FETCH_BAND', fetchBand);
}

export default bandSaga;