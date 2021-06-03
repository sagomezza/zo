import {
    SET_QR,
    SET_QR_PHONE,
} from '../actions/type'

const initialState = {
    plate: '',
    phone: ''
} 

const qrReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_QR:
            return {
                ...state,
                plate: action.payload
            };
        case SET_QR_PHONE:
            return {
                ...state,
                phone: action.payload
            };
        default:
            return state
    }
}

export default qrReducer;