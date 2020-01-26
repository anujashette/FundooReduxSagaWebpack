// FUNDOO NOTES
export const requestGetUsersSuccess = (data) => {    
    return { type: 'REQUESTED_GET_USERS_SUCCEEDED', users: data.data.data.details };
};

export const getNotes = () => {
    return { type: 'REQUEST_GET_NOTES' };
};

export const requestGetNotesSuccess = (data) => {    
    return { type: 'REQUESTED_GET_NOTES_SUCCEEDED', notes: data.data.data.data.reverse() };
};

export const getReminderNotes = () => {
    return { type: 'REQUEST_GET_REMINDER_NOTES' };
};

export const requestGetError = () => {
    return { type: 'REQUESTED_GET_FAILED' };
};

export const getlabels = () => {
    return { type: 'REQUEST_GET_LABELS' };
};

export const requestGetLabelsSuccess = (data) => {    
    return { type: 'REQUESTED_GET_LABELS_SUCCEEDED', labels: data.data.data.details };
};

export const setColorToRedux = (setColorParam) => {    
    return { type: 'SET_COLOR_ACTION' , color:setColorParam};
};

export const clearLabelCheck = () => {    
    return { type: 'CLEAR_LABEL_CHECK' };
};

export const setTransition = () => {    
    return { type: 'SET_TRSNSITION' };
};

export const unsetTransition = () => {    
    return { type: 'UNSET_TRSNSITION' };
};

export const changeView = (listGridCss) => {    
    return { type: 'CHANGE_VIEW', listGridCss:listGridCss };
};

export const requestGetLabelNotes = (labelName) => {
    return { type: 'REQUEST_GET_LABELS_NOTES', labelName };
};

export const setLabelNotes = (labelNotes) => {  
    return { type: 'SET_LABEL_NOTES', labelNotes:labelNotes };
};

export const setLabelName = (labelName) => {  
    return { type: 'SET_LABEL_NAME', labelName:labelName };
};