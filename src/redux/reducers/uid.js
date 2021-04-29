import {
    SET_UID
} from '../actions/type'

const initialState = {
    uid: ''
} 

const uidReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_UID:
            return {
                ...state,
                uid:action.payload
            };

        default:
            return state
    }
}

export default uidReducer;