import { create, read } from '../services/httpService';

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
    let token = localStorage.getItem('token');

    let userParam = {
        route: `/user/reset-password?access_token=${userObj.token}`,
        jsonObject: userObj.passwordField,
        headers: ''
    }
    return create(userParam);
}

export function requestCreateNote(noteObj) {
    let token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/addNotes?access_token=${token}`,
        jsonObject: noteObj,
        headers:  { 'content-type': 'multipart/form-data' }
    }
    return create(noteParam);
}

export function requestGetNotes() {
    let token = localStorage.getItem('token');

    let noteParam = {
        route: `/notes/getNotesList?access_token=${token}`,
        headers: ''
    }
    return read(noteParam);
}

export function requestGetLabels() {
    let token = localStorage.getItem('token');

    let labelParam = {
        route: `/noteLabels/getNoteLabelList?access_token=${token}`,
        headers: ''
    }
    return read(labelParam);
}

export function updateNoteItem(noteObj,path) {
    let token = localStorage.getItem('token');

    let noteParam = {
        route: `/notes/${path}?access_token=${token}`,
        jsonObject: noteObj,
        headers: ''
    }
    console.log('updateNoteItem',noteParam);
    

    return create(noteParam);
}

export function addLabelToNote(noteObj) {
    let token = localStorage.getItem('token');

    let noteParam = {
        route: `/notes/${noteObj.noteId}/addLabelToNotes/${noteObj.labelId}/add?access_token=${token}`,
        jsonObject: {},
        headers: {
            // 'Content-Type':'application/json',
            // 'Accept':'*',
            // Authorization : token
     }
    }

    return create(noteParam);
}

// export function pinUnpinedNote(noteObj) {
//     let token = localStorage.getItem('token');

//     let noteParam = {
//         route: `/notes/${noteObj.noteId}/addLabelToNotes/${noteObj.labelId}/add?access_token=${token}`,
//         jsonObject: {},
//         headers: {
//             // 'Content-Type':'application/json',
//             // 'Accept':'*',
//             // Authorization : token
//      }
//     }

//     return create(noteParam);
// }