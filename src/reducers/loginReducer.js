import * as types from "../actions/actionTypes";

let initialState = {
  authorization: null,
  checkToken: false,
  userName: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      let newState = Object.assign({}, state, {
        authorization: action.data.authorization,
        checkToken: true,
        userName: action.data.userName,
      });
      return newState;
    }

    case types.CHECK_VALID: {
      let newState = Object.assign({}, state, {
        checkToken: action.data.check,
      });
      return newState;
    }

    case types.TRY_LOGOUT: {
      let newState = initialState;
      return newState;
    }

    default:
      return state;
  }
}
