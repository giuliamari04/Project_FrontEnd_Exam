import {
  DOGS_LOADING,
  DOGS_SUCCESS,
  DOGS_ERROR,
  SET_FILTERED_DOGS,
} from "./action.js";

const initialState = {
  allDogs: [],
  filteredDogs:[],
  loading: false,
  error: null
};

const dogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOGS_LOADING:
      return { ...state, loading: true };

    case DOGS_SUCCESS:
      return { ...state, loading: false, allDogs: action.payload };

    case DOGS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_FILTERED_DOGS:
      return { ...state, filteredDogs: action.payload };

    default:
      return state;
  }
};

export default dogsReducer;
