const initState = {
    'email': localStorage.getItem('email'),
    'isChange': false,
    'loggedIn': false,
    currentColor: '',
    notes: [],
    labels: [],
    addedLabels: []
};

const reducer = (state = initState, action) => {
    console.log('action', action);
    switch (action.type) {
        case 'SET_COLOR_ACTION':
            return { ...state, currentColor: action.color };

        case 'CREATE_NOTE':
            return { ...state, title: action.values.title, description: action.values.description };

        case 'LOGIN_LOGOUT':
            return { ...state, isChange: !state.loggedIn };

        case 'REQUESTED_GET_NOTES_SUCCEEDED':
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

        default:
            return state;
    }
}

export default reducer;