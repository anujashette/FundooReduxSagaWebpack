import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestGetNotesSuccess, requestGetLabelsSuccess, requestGetError } from '../actions'
import { requestGetNotes, requestGetLabels, requestGetReminderNotes } from '../services/userService';
// import { getMovies } from '../services/service';

export function* watchFetchDog() {
    // console.log('saga');
    yield takeLatest('REQUEST_GET_NOTES', getNotesAsync);
    yield takeLatest('REQUEST_GET_LABELS', getLabelsAsync);
    yield takeLatest('REQUEST_GET_REMINDER_NOTES', getReminderNotesAsync);
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
        yield put(requestGetError());
    }
}

export function* getReminderNotesAsync() {
    try {
        const data = yield call(() => {
            return requestGetReminderNotes().then((res) => {
                return res;
            })
        }
        );
        yield put(requestGetNotesSuccess(data));
    } catch (error) {
        yield put(requestGetError());
    }
}

export function* getLabelsAsync() {
    try {
        const data = yield call(() => {
            return requestGetLabels().then((res) => {
                return res;
            })
        }
        );
        yield put(requestGetLabelsSuccess(data));
    } catch (error) {
        yield put(requestGetError());
    }
}