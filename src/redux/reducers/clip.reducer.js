const clipReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_CLIP':
            return action.payload;
    
        default:
            return state;
    }
}