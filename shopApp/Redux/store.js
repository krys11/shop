import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { cartItems } from "./Reducers/cartItem";

const reducers = combineReducers({
  cartItems: cartItems,
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

export { store };
