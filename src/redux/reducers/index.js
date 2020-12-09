import { combineReducers } from "redux";
import official from './official';
import recips from './recips';
import reservations from './reservations';
import hq from './hq';
import qr from './qr';


const rootReducer = combineReducers({
    official,
    recips,
    reservations,
    hq,
    qr
  });

  export default rootReducer;