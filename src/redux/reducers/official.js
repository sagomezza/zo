import {
    SET_OFFICIAL
} from '../actions/type'

const initialState = {
    email: null,
    phone: null,
    name: null,
    lastName: null,
    id: null,
    hq: []
} 

const officialReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_OFFICIAL:
            return {
                ...state,
                id:action.payload.id,
                email: action.payload.email,
                phone: action.payload.phone,
                name: action.payload.name,
                lastName: action.payload.lastName,
                id: action.payload.id,
                hq: action.payload.hq
            };

        default:
            return state
    }
}

export default officialReducer;