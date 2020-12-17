import {
  SET_PUSH_TOKEN
} from '../actions/type'

const pushTokenReducer = (state="", action ) => {
  switch (action.type) {
      case SET_PUSH_TOKEN:
          return {
              ...state,
              expoToken: action.payload
          };

      default:
          return state
  }
}

export default pushTokenReducer;