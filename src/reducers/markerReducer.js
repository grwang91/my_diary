import * as types from "../actions/actionTypes";

let initialState = {
  markers: [],
};

export default function markerReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MARKERS: {
      return { ...state, markers: action.data };
    }

    default:
      return state;
  }
}
