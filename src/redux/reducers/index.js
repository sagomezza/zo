import { combineReducers } from "redux";
import official from './official';
import recips from './recips';
import reservations from './reservations';


const rootReducer = combineReducers({
    official,
    recips,
    reservations
  });

  export default rootReducer;