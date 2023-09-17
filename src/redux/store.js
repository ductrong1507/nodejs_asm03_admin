import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    orderReducer,
    productReducer,
  },
});
