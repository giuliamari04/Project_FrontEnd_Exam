import {
  CATS_LOADING,
  CATS_SUCCESS,
  CATS_ERROR,
  SET_FILTERED_CATS,
} from "./action.js";

const initialState = {
  allCats: [],
  filteredCats:[],
  loading: false,
  error: null
};

const catsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATS_LOADING:
      return { ...state, loading: true };

    case CATS_SUCCESS:
      return { ...state, loading: false, allCats: action.payload };

    case CATS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_FILTERED_CATS:
      return { ...state, filteredCats: action.payload };

    default:
      return state;
  }
};

export default catsReducer;
