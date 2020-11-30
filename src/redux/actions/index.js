import {
  SET_OFFICIAL,
  SET_RESERVATIONS
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