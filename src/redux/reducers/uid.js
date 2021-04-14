import {
    SET_UID
} from '../actions/type'

const initialState = {
    plate: '',
    phone: ''
} 

const uidReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_UID:
            return {
                ...state,
                uid:action.payload.uid
            };

        default:
            return state
    }
}

export default uidReducer;