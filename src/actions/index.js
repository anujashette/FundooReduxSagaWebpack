export const requestMovieSuccess = (data) => {
    console.log('actions', data.data.data);

    return { type: 'REQUESTED_MOVIE_SUCCEEDED', movies: data.data.data }
};

export const requestMovieError = () => {
    return { type: 'REQUESTED_MOVIE_FAILED' }
};

export const fetchMovie = () => {
    return { type: 'FETCHED_MOVIE' }
};

// FUNDOO NOTES

export const getNotes = () => {
    return { type: 'REQUEST_GET_NOTES' }
};

export const requestGetNotesSuccess = (data) => {
    return { type: 'REQUESTED_GET_NOTES_SUCCEEDED', notes: data.data.data.data }
};

export const getlabels = () => {
    return { type: 'REQUEST_GET_LABELS' }
};

export const requestGetLabelsSuccess = (data) => {
    return { type: 'REQUESTED_GET_LABELS_SUCCEEDED', labels: data.data.data.details }
};

export const setColorToRedux = (setColorParam) => {    
    return { type: 'SET_COLOR_ACTION' , color:setColorParam}
};

export const clearLabelCheck = () => {    
    return { type: 'CLEAR_LABEL_CHECK' }
};



