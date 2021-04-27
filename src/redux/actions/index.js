import {
  SET_OFFICIAL,
  SET_RESERVATIONS,
  SET_RECIPS,
  SET_HQ,
  SET_QR,
  SET_QR_PHONE,
  SET_PUSH_TOKEN,
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

export const setQr = (qr) => {
  return {
    type: SET_QR,
    payload: qr,
  };
};

export const setPhone = (phone) => {
  return {
    type: SET_QR_PHONE,
    payload: phone,
  };
};


export const setExpoToken = (token) => {
  return {
    type: SET_PUSH_TOKEN,
    payload: token,
  };
};

