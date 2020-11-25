import {
    SET_OFFICIAL
} from './type'

export const setOfficial = (official) => {
    return {
      type: SET_OFFICIAL,
      payload: official,
    };
  };