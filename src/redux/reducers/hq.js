import {
    SET_HQ
} from '../actions/type'

const initialState = {
   name: ''
} 

const hqReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_HQ:
            return {
                ...state,
                name: action.payload.name
            };     
        default: 
            return state
    }
}

export default hqReducer;