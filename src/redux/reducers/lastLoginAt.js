import {
    SET_LAST_LOGIN_AT
} from '../actions/type'

const initialState = {
    lastLoginAt: ''
} 

const lastLoginAtReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_LAST_LOGIN_AT:
            return {
                ...state,
                lastLoginAt:action.payload.lastLoginAt
            };

        default:
            return state
    }
}

export default lastLoginAtReducer;