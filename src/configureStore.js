import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

function configureStore() {
  return createStore(rootReducer);
}

export default configureStore;
