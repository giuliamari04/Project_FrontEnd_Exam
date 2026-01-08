import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CatApi from "../api/CatApi";
import { randomFemaleDogName, randomMaleDogName } from "dog-names";

// fetch asincrona per i cani
export const fetchCats = createAsyncThunk("cats/fetchCats", async () => {
  const data = await CatApi(1);
  const validCats = data
    .filter(cat => cat.breeds && cat.breeds.length > 0)
    .map(cat => {
      const gender = Math.random() < 0.5 ? "Male" : "Female";
      return {
        ...cat,
        gender,
        name: gender === "Male" ? randomMaleDogName() : randomFemaleDogName(),
      };
    });

  // salviamo nel localStorage per persistenza
  localStorage.setItem("allCatss", JSON.stringify(validCats));
  console.log("catSlice cats:", validCats);
  return validCats;
});

const initialState = {
  allCats: [],
  filteredCats: [],
  loading: false,
  error: null,
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    setFilteredCats: (state, action) => {
      state.filteredCats = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCats.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.loading = false;
        state.allCats = action.payload;
        state.filteredCats = action.payload;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilteredCats } = catsSlice.actions;
export default catsSlice.reducer;
