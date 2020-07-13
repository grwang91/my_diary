import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import articleReducer from "./articleReducer";

const rootReducer = combineReducers({ loginReducer, articleReducer });

export default rootReducer;
