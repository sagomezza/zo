import { combineReducers } from "redux";
import official from './official';
import recips from './recips';
import reservations from './reservations';
import hq from './hq';
import qr from './qr';
import expoToken from './pushToken'
import uid from './uid';
import lastLoginAt from './lastLoginAt';


const rootReducer = combineReducers({
  official,
  recips,
  reservations,
  hq,
  qr,
  expoToken,
  uid,
  lastLoginAt
});

export default rootReducer;