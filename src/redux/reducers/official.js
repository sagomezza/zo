import {
    SET_OFFICIAL
} from '../actions/type'

const initialState = {
    email: null,
    phone: null,
    name: null,
    lastName: null
} 

const officialReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_OFFICIAL:
            return {
                ...state,
                official: action.payload
            };

        default:
            return state
    }
}

export default officialReducer;