import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsSliceReducer from "../features/products/productsSlice";
import singleProductSliceReducer from "../features/singleProduct/singleProductSlice";
import usersSliceReducer from "../features/users/usersSlice";
import myCartSliceReducer from "../features/myCart/myCartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersSliceReducer,
    products: productsSliceReducer,
    product: singleProductSliceReducer,
    cart: myCartSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
