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

// Create a band, add the logged in user as a member, then update the list.
function* createBand(action) {
    try {
        console.log('create band', action.payload);
        const band_name = action.payload.band_name;
        const user_id = action.payload.user_id;
        const response = yield axios.post('/api/band', {band_name});
        yield put({
            type: 'ADD_BAND_MEMBER', 
            payload: {
                bandId: response.data.id,
                userId: user_id,
                role: 'admin'
            }
        });
    } catch (error) {
        console.warn(error);
    }
}

function* addMember(action) {
    try {
        console.log("add member:", action.payload);
        const bandId = action.payload.bandId;
        const userId = action.payload.userId;
        const role = action.payload.role;
        yield axios.post(`/api/band/member/${bandId}`, 
            {
                user_id: userId,
                role: role
            })
        yield put({type: 'FETCH_BAND'});
    } catch (error) {
        console.warn(error);
    }
}

function* deleteBand(action) {
    try {

        yield put({type: 'FETCH_BAND'});
    } catch (error) {
        console.warn(error);
    }
}

function* removeMember(action) {
    try {
        const user_id = action.payload.userId;
        const bandId = action.payload.bandId;
        yield axios.delete(`/api/band/member/${bandId}`, {data: {user_id}});
        yield put({type: 'FETCH_BAND'});
    } catch (error) {
        console.warn(error);
    }
}

function* bandSaga() {
    yield takeLatest('FETCH_BAND', fetchBand);
    yield takeLatest('CREATE_BAND', createBand);
    yield takeLatest('ADD_BAND_MEMBER', addMember);
    yield takeLatest('DELETE_BAND', deleteBand);
    yield takeLatest('REMOVE_MEMBER', removeMember);
}

export default bandSaga;