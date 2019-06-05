import { createStore } from "redux";
import { combineReducers } from "redux";

import me from "./Reducers/me";
import session from "./Reducers/session";

const rootReducer = combineReducers({
  me,
  session
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
