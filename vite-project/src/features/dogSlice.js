import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DogApiTest from "../api/DogApiTest";
import { randomFemaleDogName, randomMaleDogName } from "dog-names";

// fetch asincrona per i cani
export const fetchDogs = createAsyncThunk("dogs/fetchDogs", async () => {
  const data = await DogApiTest(1);
  const validDogs = data
    .filter(dog => dog.breeds && dog.breeds.length > 0)
    .map(dog => {
      const gender = Math.random() < 0.5 ? "Male" : "Female";
      return {
        ...dog,
        gender,
        name: gender === "Male" ? randomMaleDogName() : randomFemaleDogName(),
      };
    });

  // salviamo nel localStorage per persistenza
  localStorage.setItem("allDogs", JSON.stringify(validDogs));
  console.log("dogSlice dogs:", validDogs);
  return validDogs;
});

const initialState = {
  allDogs: [],
  filteredDogs: [],
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setFilteredDogs: (state, action) => {
      state.filteredDogs = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDogs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allDogs = action.payload;
        state.filteredDogs = action.payload;
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilteredDogs } = dogsSlice.actions;
export default dogsSlice.reducer;
