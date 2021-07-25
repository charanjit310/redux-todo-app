import { combineReducers } from "redux";
import registerReducer from "./registerReducer";

const rootReducer = combineReducers({
  registerReducer: registerReducer
});

export default rootReducer;