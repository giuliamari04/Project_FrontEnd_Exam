import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "./features/dogs/reducer";
import catReducer from "./features/cats/reducer";

const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    cats: catReducer
  }
});

export default store
