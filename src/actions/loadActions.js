import serverapi from "../api/serverapi";
import * as types from "../actions/actionTypes";

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
