import { create, get, read } from '../services/httpService';
let token = localStorage.getItem('token');
export function registerUser(userObj) {

    let userParam = {
        route: '/user/userSignUp',
        jsonObject: userObj,
        headers: ''
    }
    return create(userParam);
}

export function loginUser(userObj) {

    let userParam = {
        route: '/user/login',
        jsonObject: userObj,
        headers: ''
    }

    return create(userParam);
}

export function forgotPassword(userObj) {

    let userParam = {
        route: '/user/reset',
        jsonObject: userObj,
        headers: ''
    }

    return create(userParam);
}

export function resetPassword(userObj) {
    let userParam = {
        route: `/user/reset-password?access_token=${userObj.token}`,
        jsonObject: userObj.passwordField,
        headers: ''
    }
    return create(userParam);
}

export function requestCreateNote(noteObj) {
    let userParam = {
        route: `/notes/addNotes?access_token=${token}`,
        jsonObject: noteObj,
        headers: ''
    }
    console.log('user service--',userParam);
    return create(userParam);
}

export function requestGetNotes() {
    let userParam = {
        route: `/notes/getNotesList?access_token=${token}`,
        headers: ''
    }
    console.log(userParam);
    return read(userParam);
}

export function requestGetLabels() {
    let userParam = {
        route: `/noteLabels/getNoteLabelList?access_token=${token}`,
        headers: ''
    }
    console.log(userParam);
    return read(userParam);
}
