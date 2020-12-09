import {
  SET_OFFICIAL,
  SET_RESERVATIONS,
  SET_RECIPS,
  SET_HQ
} from './type'

export const setOfficial = (official) => {
  return {
    type: SET_OFFICIAL,
    payload: official,
  };
};

export const setReservations = (reservations) => {
  return {
    type: SET_RESERVATIONS,
    payload: reservations,
  };
};

export const setRecips = (recips) => {
  return {
    type: SET_RECIPS,
    payload: recips,
  };
};

export const setHq = (hq) => {
  return {
    type: SET_HQ,
    payload: hq,
  };
};