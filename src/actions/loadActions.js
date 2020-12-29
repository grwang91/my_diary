import serverapi from "../api/serverapi";
import * as types from "../actions/actionTypes";

export const setCoord = (dispatch, coord) => {
  dispatch({
    type: types.SET_COORD,
    data: coord,
  });
};

export const setAskMark = (dispatch, state) => {
  dispatch({
    type: types.SET_ASK_MARK,
    data: state,
  });
};

export const setMarkerToInput = (dispatch, state) => {
  dispatch({
    type: types.SET_MARKER_TO_INPUT,
    data: state,
  });
};

export const tryGetMarkerAndDispatch = (dispatch, authorization) => {
  return serverapi.tryGetMarkers(authorization).then((response) => {
    if (response.message === "Success") {
      dispatch({
        type: types.GET_MARKERS,
        data: response.data,
      });
    }
  });
};

export const checkTokenValid = (dispatch) => (authorization) => {
  return serverapi.checkTokenValid(authorization).then((response) => {
    let check = false;
    if (response.message === "Success") {
      check = true;
    }
    dispatch({
      type: types.CHECK_VALID,
      data: {
        check,
      },
    });
  });
};

export const tryLogoutAndDispatch = (dispatch) => {
  console.log("logout");
  dispatch({
    type: types.TRY_LOGOUT,
  });
};

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
  let userName = loginID;
  return serverapi.tryLogin(loginID, password).then((response, loginID) => {
    let authorization = response.headers.get("authorization");
    response.json().then((data) => {
      if (data.message === "Success") {
        console.log("login success");
        dispatch({
          type: types.LOGIN_SUCCESS,
          data: {
            authorization,
            userName,
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
