import { Environments } from "@/constants/enums";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"
export const Store = configureStore({
  reducer: {
    cart:cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});

export type Rootstate = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
