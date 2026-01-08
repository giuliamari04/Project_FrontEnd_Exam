import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "./features/dogSlice";
import catReducer from "./features/catSlice";

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    cats:catReducer,
  },
});
