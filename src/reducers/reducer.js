const initState = {
    'email': localStorage.getItem('email'),
    'isChange': false,
    'loggedIn': false,
    appbarTitle: 'Fundoo',
    currentColor: '#ffffff',
    users: [],
    notes: [],
    labels: [],
    addedLabels: [],
    transitionCss: 'main-display',
    transitionTakeNote: 'take-note-div',
    transitionCreateNote: 'create-note-div',
    labelNotes: [],
    currentLabelName: '',
    editLabelDialog: false,
    listGridView: true,
    displayCardList: 'display-card',
    searchedNotes: [],
    profilePicture: ''
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_COLOR_ACTION':
            return { ...state, currentColor: action.color };
        case 'CREATE_NOTE':
            return { ...state, title: action.values.title, description: action.values.description };
        case 'LOGIN_LOGOUT':
            return { ...state, isChange: !state.loggedIn };
        case 'APPBAR_TITLE':
            return { ...state, appbarTitle: action.appbarTitle };
        case 'SET_PROFILE':
            localStorage.setItem('imageUrl', action.profilePicture)
            return { ...state, profilePicture: action.profilePicture };
        case 'REQUESTED_GET_NOTES_SUCCEEDED':
            return { ...state, notes: action.notes };
        case 'REQUESTED_GET_LABELS_SUCCEEDED':
            return { ...state, labels: action.labels };
        case 'CHECK_LIST':
            return { ...state, labels: action.action };
        case 'CLEAR_LABEL_CHECK':
            for (const each of state.labels) {
                if (each.isDeleted) {
                    each.isDeleted = false;
                }
            }
            return { ...state, labels: state.labels };
        case 'SET_TRSNSITION':
            return { ...state, transitionCss: 'transition-main', transitionTakeNote: 'take-note-transition', transitionCreateNote: 'create-note-transition' }
        case 'UNSET_TRSNSITION':
            return { ...state, transitionCss: 'main-display', transitionTakeNote: 'take-note-div', transitionCreateNote: 'create-note-div' }
        case 'SET_LABEL_NOTES':
            return { ...state, labelNotes: action.labelNotes };
        case 'SET_LABEL_NAME':
            return { ...state, currentLabelName: action.labelName };
        case 'EDIT_LABEL_OPEN':
            return { ...state, editLabelDialog: action.editLabelDialog };
        case 'CHANGE_VIEW':
            return { ...state, listGridView: !state.listGridView, displayCardList: action.listGridCss };
        case 'UPDATE_LABELS':
            return { ...state, labels: action.updatedLabels };
        case 'SEARCH_KEYWORD':
            let searchNotes = state.notes.filter(val => {
                return val.isDeleted === false && val.title !== '' && val.description !== '' && val.title === action.searchKeyword || val.description === action.searchKeyword;
            });
            return { ...state, searchedNotes: searchNotes };
        default:
            return state;
    }
}

export default reducer;