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

function* createSong(action) {
    try {
        const song_name = action.payload.songName;
        const song_description = action.payload.songDescription;
        const band_id = action.payload.bandId;
        yield axios.post(`/api/song`, {song_name, song_description, band_id});
        yield put({type: 'FETCH_SONG'});
    } catch (error) {
        console.warn('Failed to create song', error);
    }
}

function* addSongComment(action) {
    try {
        const songId = action.payload.songId;
        const comment = action.payload.comment;
        yield axios.post(`/api/song/comment/${songId}`, {comment: comment});
        yield put({type: 'FETCH_SONG'});
    } catch (error) {
        console.warn('Failed to add song comment', error);
    }
}

function* songSaga() {
    yield takeLatest('FETCH_SONG', fetchSong);
    yield takeLatest('CREATE_SONG', createSong)
    yield takeLatest('ADD_SONG_COMMENT', addSongComment);
}

export default songSaga;