import {
    SET_RESERVATIONS
} from '../actions/type'

const initialState = {
    reservations: []
} 

const reservationsReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload
            };   
        default: 
            return state
    }
}

export default reservationsReducer;