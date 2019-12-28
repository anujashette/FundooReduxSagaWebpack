const initState = [{
    'firstname': '',
    'lastname': '',
    'username': '',
    'password':'',
    'confirmPassword':'',
    'isChange': false
}];

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'PRINT_DATA':
            return { ...state, firstname: 'anjali', isChange: !state.isChange };
        case 'PRINT_DATA_REPEAT':
            return { ...state, firstname: 'omkar', isChange: !state.isChange };
        default:
            return state;
    }
}

export default reducer;