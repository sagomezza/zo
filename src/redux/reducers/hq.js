import {
    SET_HQ,
    SUBTRACT_CAR,
    SUBTRACT_BIKE,
    ADD_CAR,
    ADD_BIKE
} from '../actions/type'

const initialState = {
   name: '',
   availableCars: 0,
   availableBikes: 0,
   totalCars: 0,
   totalBikes: 0
} 

const hqReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_HQ:
            return {
                ...state,
                name: action.payload.name,
                availableCars: action.payload.availableCars,
                availableBikes: action.payload.availableBikes,
                totalCars: action.payload.totalCars,
                totalBikes: action.payload.totalBikes
            };  
        case SUBTRACT_CAR:
            return {
                ...state,
                availableCars: state.availableCars + 1
            }; 
        case SUBTRACT_BIKE:
            return {
                ...state,
                availableBikes: state.availableBikes + 1
            };    
        case ADD_CAR:
            return {
                ...state,
                availableCars: state.availableCars - 1
            }; 
        case ADD_BIKE:
            return {
                ...state,
                availableBikes: state.availableBikes - 1
            };                  
        default: 
            return state
    }
}

export default hqReducer;