import { create, read, remove } from '../services/httpService';
let token = '';
export function registerUser(userObj) {
    let userParam = {
        route: '/user/userSignUp',
        jsonObject: userObj,
        headers: {}
    }
    return create(userParam);
}

export function loginUser(userObj) {
    let userParam = {
        route: '/user/login',
        jsonObject: userObj,
        headers: {}
    }
    return create(userParam);
}

export function uploadProfile(imageObj) {

    let token = localStorage.getItem('token')
    let userParam = {
        route: `/user/uploadProfileImage`,
        jsonObject: imageObj,
        headers: {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': token
            }
        }
    }
    return create(userParam);
}

export function forgotPassword(userObj) {
    let userParam = {
        route: '/user/reset',
        jsonObject: userObj,
        headers: {}
    }
    return create(userParam);
}

export function resetPassword(userObj) {
    let userParam = {
        route: `/user/reset-password?access_token=${userObj.token}`,
        jsonObject: userObj.passwordField,
        headers: {}
    }
    return create(userParam);
}

export function requestCreateNote(noteObj) {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/addNotes?access_token=${token}`,
        jsonObject: noteObj,
        headers: { 'content-type': 'multipart/form-data' }
    }
    return create(noteParam);
}

export function requestGetNotes() {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/getNotesList?access_token=${token}`,
        headers: {}
    }
    return read(noteParam);
}

export function requestGetLabels() {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/noteLabels/getNoteLabelList?access_token=${token}`,
        headers: {}
    }
    return read(labelParam);
}

export function updateNoteItem(noteObj, path) {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/${path}?access_token=${token}`,
        jsonObject: noteObj,
        headers: {}
    }
    return create(noteParam);
}

export function addLabelToNote(noteObj) {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/${noteObj.noteId}/addLabelToNotes/${noteObj.labelId}/add?access_token=${token}`,
        jsonObject: {},
        headers: {}
    }

    return create(noteParam);
}

export function requestGetReminderNotes() {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/getReminderNotesList?access_token=${token}`,
        headers: {}
    }
    return read(noteParam);
}

export function getLabelNotes(labelName) {
    token = localStorage.getItem('token');
    let noteParam = {
        route: `/notes/getNotesListByLabel/${labelName}?access_token=${token}`,
        headers: {}
    }
    return create(noteParam);
}

export function createLabel(labelObj) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/noteLabels?access_token=${token}`,
        jsonObject: labelObj,
        headers: {}
    }
    return create(labelParam);
}

export function updateLabel(labelObj, labelId) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/noteLabels/${labelId}/updateNoteLabel?access_token=${token}`,
        jsonObject: labelObj,
        headers: {}
    }
    return create(labelParam);
}

export function deleteLabel(labelId) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/noteLabels/${labelId}/deleteNoteLabel?access_token=${token}`,
        headers: {}
    }
    return remove(labelParam);
}

export function trashNote(noteObj) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/notes/trashNotes?access_token=${token}`,
        jsonObject: noteObj,
        headers: {}
    }
    return create(labelParam);
}

export function deleteNoteForever(noteObj) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/notes/deleteForeverNotes?access_token=${token}`,
        jsonObject: noteObj,
        headers: {}
    }
    return create(labelParam);
}

export function searchUserList(searchObj) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/user/searchUserList?access_token=${token}`,
        jsonObject: searchObj,
        headers: {}
    }
    return create(labelParam);
}

export function addCollaboratorToNote(userObj, noteId) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/notes/${noteId}/AddcollaboratorsNotes?access_token=${token}`,
        jsonObject: userObj,
        headers: {}
    }
    return create(labelParam);
}

export function getNoteDetails(noteId) {
    token = localStorage.getItem('token');
    let labelParam = {
        route: `/notes/getNotesDetail/${noteId}?access_token=${token}`,
        headers: {}
    }
    return read(labelParam);
}

export function addQuestionAndAnswer(questionObj) {
    token = localStorage.getItem('token');
    let questionAnswerParam = {
        route: `/questionAndAnswerNotes/addQuestionAndAnswer?access_token=${token}`,
        jsonObject: questionObj,
        headers: {}
    }
    return create(questionAnswerParam);
}

export function updateLikeReplyRate(likeUnlikeObj, parentId, path) {
    token = localStorage.getItem('token');
    let questionAnswerParam = {
        route: `/questionAndAnswerNotes/${path}/${parentId}?access_token=${token}`,
        jsonObject: likeUnlikeObj,
        headers: {}
    }
    return create(questionAnswerParam);
}

// export function addReplyApi() {

//     let replyParam = {
//         route: `/questionAndAnswerNotes/${path}/${parentId}?access_token=${token}`,
//         jsonObject: likeUnlikeObj,
//         headers: {}
//     }
//     return create(replyParam);
// }