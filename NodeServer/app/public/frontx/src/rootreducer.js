import { combineReducers } from "redux";
import data from './reducers/DataReducer';

const rootReducer = combineReducers({
  data
});

export default rootReducer;
