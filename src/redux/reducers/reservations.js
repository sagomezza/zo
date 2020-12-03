import {
    SET_RESERVATIONS
} from '../actions/type'

const initialState = {
    reservations: []
} 

const reservationsReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_RESERVATIONS:
            console.log('asdhakshd')
            console.log(action)
            return {
                reservations: action.payload
            };   
        default: 
            return state
    }
}

export default reservationsReducer;