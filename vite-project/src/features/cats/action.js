// src/features/cats/action.js
export const CATS_LOADING = "CATS_LOADING";
export const CATS_SUCCESS = "CATS_SUCCESS";
export const CATS_ERROR = "CATS_ERROR";
export const SET_FILTERED_CATS = "SET_FILTERED_CATS";

import CatApi from "../../api/CatApi"; // la tua fetch ai 24 cani
import { randomFemaleDogName, randomMaleDogName } from "dog-names";


const fetchCatsAction = () => async (dispatch) => {
  dispatch({ type: CATS_LOADING });

  try {
    let cats = localStorage.getItem("cats");
    if (cats) {
      cats = JSON.parse(cats);
    } else {
      cats = await CatApi(); // fetch 24 cani
      localStorage.setItem("cats", JSON.stringify(cats));
    }

    // aggiungi nome e genere random a ciascun cane
    const catsWithRandomNames = cats.map(cat => {
      // assegna genere casuale
      const gender = Math.random() < 0.5 ? "Male" : "Female";

      // assegna nome a seconda del genere
      const name = gender === "Male" ? randomMaleDogName() : randomFemaleDogName();

      return {
        ...cat,
        gender,
        name
      };
    });

    dispatch({ type: CATS_SUCCESS, payload: catsWithRandomNames });
    console.log("cats in action", catsWithRandomNames);

  } catch (err) {
    dispatch({ type: CATS_ERROR, payload: err.message });
  }
}
export default fetchCatsAction
export const setFilteredCats = (cats) => ({
  type: SET_FILTERED_CATS,
  payload: cats,
});
