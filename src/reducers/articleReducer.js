import * as types from "../actions/actionTypes";
import produce from "immer";

let initialState = {
  diaries: [],
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_DIARY: {
      const nextState = produce(state, (draft) => {
        draft.diaries.push(action.data);
      });
      return nextState;
    }

    default:
      return state;
  }
}
