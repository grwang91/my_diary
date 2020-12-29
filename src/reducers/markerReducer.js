import * as types from "../actions/actionTypes";

let initialState = {
  markers: [],
  markerToInput: false,
  askMark: false,
  coord: { lat: 1, lng: 1 },
};

export default function markerReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MARKERS: {
      return { ...state, markers: action.data };
    }

    case types.SET_MARKER_TO_INPUT: {
      return { ...state, markerToInput: action.data, askMark: false };
    }

    case types.SET_ASK_MARK: {
      return { ...state, askMark: action.data, markerToInput: false };
    }

    case types.SET_COORD: {
      return { ...state, coord: action.data };
    }

    default:
      return state;
  }
}
