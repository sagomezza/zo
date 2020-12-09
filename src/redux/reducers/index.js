import { combineReducers } from "redux";
import official from './official';
import recips from './recips';
import reservations from './reservations';
import hq from './hq';


const rootReducer = combineReducers({
    official,
    recips,
    reservations,
    hq
  });

  export default rootReducer;