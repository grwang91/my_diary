import * as types from "../actions/actionTypes";
import produce from "immer";

let initialState = {
  diaries: [],
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DIARIES_SUCCESS: {
      return { ...state, diaries: action.data };
    }

    default:
      return state;
  }
}
