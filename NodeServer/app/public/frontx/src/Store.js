import { createStore, applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";

import rootReducer from "./rootreducer";

const middleware = applyMiddleware(thunkMiddleware);

const Store = createStore(rootReducer, middleware);

export default Store;
