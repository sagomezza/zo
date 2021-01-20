import {
    SET_HQ,
    SUBTRACT_CAR,
    SUBTRACT_BIKE,
    ADD_CAR,
    ADD_BIKE
} from '../actions/type'

const initialState = {
   
   availableCars: 0,
   availableBikes: 0,
   totalCars: 0,
   totalBikes: 0,
   occupiedBikes: 0,
   occupiedCars: 0,
} 

const hqReducer = (state=initialState, action ) => {
    switch (action.type) {
        case SET_HQ:
            return {
                ...state,
                name: action.payload.name,
                occupiedBikes: action.payload.occupiedBikes,
                occupiedCars: action.payload.occupiedCars,
                availableCars: action.payload.availableCars,
                availableBikes: action.payload.availableBikes,
                totalCars: action.payload.totalCars,
                totalBikes: action.payload.totalBikes
            };                  
        default: 
            return state
    }
}

export default hqReducer;