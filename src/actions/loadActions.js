import serverapi from "../api/serverapi";
import * as types from "../actions/actionTypes";

export const trySignupAndLogin = (dispatch) => (loginID, password) => {
  return serverapi.trySignup(loginID, password).then((response) => {
    console.log(response);
    if (response.message === "Success") {
      tryLoginAndDispatch(dispatch)(loginID, password);
    } else if (response.status === 403) {
      alert("아이디가 있습니다");
    }
  });
};

export const tryLoginAndDispatch = (dispatch) => (loginID, password) => {
  return serverapi.tryLogin(loginID, password).then((response) => {
    console.log(response);
    if (response.message === "Success") {
      dispatch({
        type: types.LOGIN_SUCCESS,
        data: response.data,
      });
    } else {
      alert("아이디/비밀번호를 확인해주세요");
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
