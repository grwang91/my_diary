import * as types from "../actions/actionTypes";

let initialState = {
  diaries: [],
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DIARIES_SUCCESS: {
      return { ...state, diaries: action.data };
    }

    case types.GET_MARKERS: {
      return { ...state, marker: action.data };
    }

    default:
      return state;
  }
}
