import serverapi from "../api/serverapi";
import * as types from "../actions/actionTypes";

export const trySignupAndLogin = (dispatch) => (loginID, password) => {
  return serverapi.trySignup(loginID, password).then((response) => {
    if (response.message === "Success") {
      console.log("signup success");
      tryLoginAndDispatch(dispatch)(loginID, password);
    } else if (response.status === 403) {
      alert("아이디가 있습니다");
    }
  });
};

export const tryLoginAndDispatch = (dispatch) => (loginID, password) => {
  return serverapi.tryLogin(loginID, password).then((response) => {
    let authorization = response.headers.get("authorization");
    response.json().then((data) => {
      if (data.message === "Success") {
        console.log("login success");
        dispatch({
          type: types.LOGIN_SUCCESS,
          data: {
            authorization,
          },
        });
      } else {
        alert("아이디/비밀번호를 확인해주세요");
      }
    });
  });
};

export const tryGetDiariesAndDispatch = (dispatch) => (authorization) => {
  return serverapi.getDiaries(authorization).then((response) => {
    if (response.message === "Success") {
      dispatch({
        type: types.LOAD_DIARIES_SUCCESS,
        data: response.data,
      });
    }
  });
};
