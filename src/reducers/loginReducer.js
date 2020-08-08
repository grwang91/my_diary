import * as types from "../actions/actionTypes";

let initialState = {
  authorization: "",
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      let newState = Object.assign({}, state, {
        authorization: action.data,
      });
      return newState;
    }

    default:
      return state;
  }
}
