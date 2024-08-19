import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;
