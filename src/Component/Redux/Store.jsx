import { createStore, applyMiddleware } from "redux";
import Reducer from "./TableActions/Reducer"
// import logger from "redux-logger";
import thunk from "redux-thunk" 
const store = createStore(Reducer, applyMiddleware(thunk));

export default store;