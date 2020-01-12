import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import {  requestMovieSuccess, requestMovieError, requestGetNotesSuccess, requestGetLabelsSuccess } from '../actions'
import { requestGetNotes, requestGetLabels } from '../services/userService';
// import { getMovies } from '../services/service';

export function* watchFetchDog() {
    console.log('saga');
    yield takeLatest('REQUEST_GET_NOTES', getNotesAsync);  
    yield takeLatest('REQUEST_GET_LABELS', getLabelsAsync);  
}

// export function* fetchDogAsync() {
//     try {
//         yield put(requestDog());
//         const data = yield call(() => {
//             return fetch('https://dog.ceo/api/breeds/image/random')
//                 .then(res => res.json())
//         }
//         );
//         yield put(requestDogSuccess(data));
//     } catch (error) {
//         yield put(requestDogError());
//     }
// }

export function* getNotesAsync() {
    try {
        const data = yield call(() => {
            return requestGetNotes().then((res) => {
                return res;
            })
        }
        );
        yield put(requestGetNotesSuccess(data));
    } catch (error) {
        yield put(requestMovieError());
    }
}


export function* getLabelsAsync() {
    try {
        const data = yield call(() => {
            return requestGetLabels().then((res) => {
                console.log('saga get labels', res);
                return res;
            })
        }
        );        
        yield put(requestGetLabelsSuccess(data));
    } catch (error) {
        yield put(requestMovieError());
    }
}