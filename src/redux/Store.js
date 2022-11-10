import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";

const initialState = {}
const middlewares = [thunk];
let devtools = (x) => x;

export const Store = createStore(RootReducer, initialState, compose(applyMiddleware(...middlewares), devtools))
