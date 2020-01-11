const initState = {
    'email': localStorage.getItem('email'),
    'isChange': false,
    'loggedIn': false,
    currentColor: '',
    notes: [],
    labels: [],
    addedLabels: [],
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

        case 'ADD_LABEL_ID':
            console.log('actions label id added', action);

            return state.addedLabels.concat([action.labelId]);

        case 'CLEAR_LABEL_ID':
            // return state.addedLabelsId.filter(state.addedLabels.indexOf(action.labelId));
            return { ...state, addedLabels: action.clearLabelId }

        case 'CHECK_LIST':
            // return state.addedLabelsId.filter(() => {if(action.isDeleted){ return state.addedLabels(action)}});
            console.log('checklist', action);
            return { ...state, labels: action.action }

        // case 'ISDELETED_FALSE':
        //     return state.addedLabelsId.filter(function toggle(data,index){ console.log('is false',data);;
        //      if (data.isDeleted) { return !data.isDeleted } });

        default:
            return state;
    }
}

export default reducer;