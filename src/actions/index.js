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
    let notes = data.data.data.data.filter(val => {
        return val.isArchived === false && val.isDeleted === false;
      });
    return { type: 'REQUESTED_GET_NOTES_SUCCEEDED', notes: notes.reverse() }
};

export const requestGetError = () => {
    return { type: 'REQUESTED_GET_FAILED' }
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

export const setTransition = () => {    
    return { type: 'SET_TRSNSITION' }
};

export const unsetTransition = () => {    
    return { type: 'UNSET_TRSNSITION' }
};

export const setOtherTransition = () => {    
    return { type: 'SET_OTHER_TRSNSITION' }
};

export const unsetOtherTransition = () => {    
    return { type: 'UNSET_OTHER_TRSNSITION' }
};

// export const setColor = (colorCss) => {    
//     console.log('set color===',colorCss);
    
//     return { type: 'SET_COLOR', action:colorCss }
// };