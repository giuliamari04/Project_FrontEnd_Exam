// src/features/dogs/action.js
export const DOGS_LOADING = "DOGS_LOADING";
export const DOGS_SUCCESS = "DOGS_SUCCESS";
export const DOGS_ERROR = "DOGS_ERROR";
export const SET_FILTERED_DOGS = "SET_FILTERED_DOGS";

import testDogApi from "../../api/DogApiTest"; // la tua fetch ai 24 cani
import { randomFemaleDogName, randomMaleDogName } from "dog-names";


const fetchDogsAction = () => async (dispatch) => {
  dispatch({ type: DOGS_LOADING });

  try {
    let dogs = localStorage.getItem("dogs");
    if (dogs) {
      dogs = JSON.parse(dogs);
    } else {
      dogs = await testDogApi(); // fetch 24 cani
      localStorage.setItem("dogs", JSON.stringify(dogs));
    }

    // aggiungi nome e genere random a ciascun cane
    const dogsWithRandomNames = dogs.map(dog => {
      // assegna genere casuale
      const gender = Math.random() < 0.5 ? "Male" : "Female";

      // assegna nome a seconda del genere
      const name = gender === "Male" ? randomMaleDogName() : randomFemaleDogName();

      return {
        ...dog,
        gender,
        name
      };
    });

    dispatch({ type: DOGS_SUCCESS, payload: dogsWithRandomNames });
    
  } catch (err) {
    dispatch({ type: DOGS_ERROR, payload: err.message });
  }
}
export default fetchDogsAction
export const setFilteredDogs = (dogs) => ({
  type: SET_FILTERED_DOGS,
  payload: dogs,
});
