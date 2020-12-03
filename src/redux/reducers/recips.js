import {
    SET_RECIPS
} from '../actions/type'

const initialState = {
    recips: []
} 

const recipsReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_RECIPS:
            return {
                recips: action.payload
            };     
        default: 
            return state
    }
}

export default recipsReducer;