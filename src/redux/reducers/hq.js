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
   dailyBikePrice: 0,
   dailyCarPrice: 0,
   monthlyBikePrice: 0,
   monthlyCarPrice: 0
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
                totalBikes: action.payload.totalBikes,
                dailyBikePrice: action.payload.dailyBikePrice,
                dailyCarPrice: action.payload.dailyCarPrice,
                monthlyBikePrice: action.payload.monthlyBikePrice,
                monthlyCarPrice: action.payload.monthñyCarPrice

            };                  
        default: 
            return state
    }
}

export default hqReducer;