const bandReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BAND':
            return action.payload;
    
        default:
            return state;
    }
}

export default bandReducer;