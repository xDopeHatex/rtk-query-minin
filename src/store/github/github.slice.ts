import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";

interface GithubState {
  favourities: string[];
}

const initialState: GithubState = {
  favourities: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction) {
      state.favourities.push(action.payload!);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourities));
    },
    removeFavorite(state, action: PayloadAction) {
      state.favourities = state.favourities.filter(
        (f) => f !== action.payload!,
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourities));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
