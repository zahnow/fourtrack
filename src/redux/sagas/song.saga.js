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

function* deleteSong(action) {
    try {
        console.log('in delete song saga');
        const songId = action.payload.songId;
        yield axios.delete(`/api/song/${songId}`);
        yield put({type: 'FETCH_SONG'}); 
        yield put({type: 'FETCH_CLIP'});
    } catch (error) {
        console.warn('Failed to delete song', error);
    }
}

function* deleteSongComment(action) {
    try {
        const commentId = action.payload.commentId;
        yield axios.delete(`/api/song/comment/${commentId}`);
        yield put({type: 'FETCH_SONG'}); 
    } catch (error) {
        console.warn('Failed to delete comment', error);
    }
}

function* updateSong(action) {
    try {
        const songId = action.payload.songId;
        const songName = action.payload.songName;
        const songDescription = action.payload.songDescription;
        // console.log('song name:', songName);
        // console.log('song id:', songId);
        axios.put(`/api/song/${songId}`, {songName, songDescription});
        yield put({type: 'FETCH_SONG'}); 
    } catch (error) {
        console.warn('Failed to update song', error);
    }
}

function* addSongToFavorites(action) {
    try {
        const songId = action.payload.songId;
        yield axios.post(`/api/song/favorite/${songId}`);
        yield put({type: 'FETCH_SONG'}); 
    } catch (error) {
        console.warn('Failed to add favorite', error);
    }
}

function * removeSongFromFavorites(action) {
    try {
        const songId = action.payload.songId;
        yield axios.delete(`/api/song/favorite/${songId}`);
        yield put({type: 'FETCH_SONG'}); 
    } catch (error) {
        console.warn('Failed to remove favorite', error);
    }
}

// This could probably go in either saga, 
//but since the end result is a song I'm sticking it here.
function* copyClipToNewSong(action) {
    try {
        // SONG STUFF
        const song_name = action.payload.songName;
        const song_description = action.payload.songDescription;
        const band_id = action.payload.bandId;
        // CLIP STUFF
        const clipName = action.payload.clipName;
        const clipPath = action.payload.clipPath;
        const clipDescription = action.payload.clipDescription;

        const response = yield axios.post(`/api/song`, {song_name, song_description, band_id}); //response[0].id should give us the new song id
        yield console.log('response:', response);
        yield axios.post(
            `/api/clip`,
            {
                song_id: response.data[0].id,
                name: clipName,
                path: clipPath,
                description: clipDescription
            });
        yield put({type: 'FETCH_SONG'});
        yield put({type: 'FETCH_CLIP'});
    } catch (error) {
        console.warn('Failed to copy clip to new song', error);
    }
}

function* songSaga() {
    yield takeLatest('FETCH_SONG', fetchSong);
    yield takeLatest('CREATE_SONG', createSong)
    yield takeLatest('ADD_SONG_COMMENT', addSongComment);
    yield takeLatest('UPDATE_SONG', updateSong);
    yield takeLatest('DELETE_SONG', deleteSong);
    yield takeLatest('DELETE_SONG_COMMENT', deleteSongComment);
    yield takeLatest('ADD_SONG_TO_FAVORITES', addSongToFavorites);
    yield takeLatest('REMOVE_SONG_FROM_FAVORITES', removeSongFromFavorites);
    yield takeLatest('COPY_CLIP_TO_NEW_SONG', copyClipToNewSong);
}

export default songSaga;