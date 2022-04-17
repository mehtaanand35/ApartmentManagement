import { combineReducers } from "redux";
import AdminReducers from "./reducer";
const rootReducer = combineReducers({
  data: AdminReducers,
});

export default rootReducer;
