const initState = {
    'email': localStorage.getItem('email'),
    'isChange': false,
    'loggedIn': false,
    currentColor: '',
    notes: [],
    labels: [],
    addedLabels: [],
    transitionCss: 'main-display',
    transitionTakeNote: 'take-note-div',
    transitionCreateNote: 'create-note-div',
    noteColor: 'drawer-item-color',
    // reminderColor:'',
    // editLabelColor:'',
    // archiveColor:'',
    // binColor:'',
    currentLabelName: '',
    editLabelDialog: false,
    listGridView: true,
    displayCardList: 'display-card',
};

const reducer = (state = initState, action) => {
    // console.log('action', action);
    switch (action.type) {
        case 'SET_COLOR_ACTION':
            return { ...state, currentColor: action.color };

        case 'CREATE_NOTE':
            return { ...state, title: action.values.title, description: action.values.description };

        case 'LOGIN_LOGOUT':
            return { ...state, isChange: !state.loggedIn };

        case 'REQUESTED_GET_NOTES_SUCCEEDED':
            console.log('REQUESTED_GET_NOTES_SUCCEEDED', action.notes);

            return { ...state, notes: action.notes };

        case 'REQUESTED_GET_LABELS_SUCCEEDED':
            return { ...state, labels: action.labels };

        case 'CHECK_LIST':
            return { ...state, labels: action.action }

        case 'CLEAR_LABEL_CHECK':
            for (const each of state.labels) {
                if (each.isDeleted) {
                    each.isDeleted = false;
                }
            }
            return { ...state, labels: state.labels }

        case 'SET_TRSNSITION':
            return { ...state, transitionCss: 'transition-main', transitionTakeNote: 'take-note-transition', transitionCreateNote: 'create-note-transition' }

        case 'UNSET_TRSNSITION':
            return { ...state, transitionCss: 'main-display', transitionTakeNote: 'take-note-div', transitionCreateNote: 'create-note-div' }


        case 'CURRENT_CLICKED_LABEL':
            return { ...state, currentLabelName: action.labelName }

        case 'EDIT_LABEL_OPEN':
            console.log('label', action);
            return { ...state, editLabelDialog: action.editLabelDialog }

        case 'CHANGE_VIEW':
            console.log('label', action);
            return { ...state, listGridView: !state.listGridView, displayCardList: action.listGridCss }

        case 'UPDATE_LABELS':
            return { ...state, labels: action.updatedLabels };
            
        default:
            return state;
    }
}

export default reducer;