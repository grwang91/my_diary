import * as types from "../actions/actionTypes";

let initialState = {
  authorization: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      let newState = Object.assign({}, state, {
        authorization: action.data.authorization,
      });
      return newState;
    }

    default:
      return state;
  }
}
