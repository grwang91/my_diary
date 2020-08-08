import serverapi from "../api/serverapi";
import * as types from "../actions/actionTypes";

export const trySignupAndLogin = (dispatch) => (loginID, password) => {
  return serverapi.trySignup(loginID, password).then((response) => {
    if (response.message === "Success") {
      tryLoginAndDispatch(dispatch)(loginID, password);
    }
  });
};

export const tryLoginAndDispatch = (dispatch) => (loginID, password) => {
  return serverapi.tryLogin(loginID, password).then((response) => {
    if (response.message === "Success") {
      dispatch({
        type: types.LOGIN_SUCCESS,
        data: response.data,
      });
    }
  });
};

export const tryGetDiariesAndDispatch = (dispatch) => {
  return serverapi.getDiaries().then((response) => {
    if (response.message === "Success") {
      dispatch({
        type: types.LOAD_DIARIES_SUCCESS,
        data: response.data,
      });
    }
  });
};
