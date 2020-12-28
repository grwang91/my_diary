import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import articleReducer from "./articleReducer";
import markerReducer from "./markerReducer";

const rootReducer = combineReducers({
  loginReducer,
  articleReducer,
  markerReducer,
});

export default rootReducer;
