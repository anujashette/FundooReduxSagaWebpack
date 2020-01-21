import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestGetNotesSuccess, requestGetLabelsSuccess, requestGetError, setLabelNotes } from '../actions'
import { requestGetNotes, requestGetLabels, requestGetReminderNotes, getLabelNotes } from '../services/userService';
// import { getMovies } from '../services/service';

export function* watchFetchDog() {
    // console.log('saga');
    yield takeLatest('REQUEST_GET_NOTES', getNotesAsync);
    yield takeLatest('REQUEST_GET_LABELS', getLabelsAsync);
    yield takeLatest('REQUEST_GET_REMINDER_NOTES', getReminderNotesAsync);
    yield takeLatest('REQUEST_GET_LABELS_NOTES', getLabelNotesAsync);

} 

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

export function* getLabelNotesAsync({labelName}) {
    console.log('getlabels saga1',labelName);

    try {
        const data = yield call(() => {
            return getLabelNotes(labelName).then((res) => {
                return res;
            })
        }
        );
        console.log('getlabels saga',data);

        yield put(setLabelNotes(data.data.data.data));
    } catch (error) {
        yield put(requestGetError());
    }
}