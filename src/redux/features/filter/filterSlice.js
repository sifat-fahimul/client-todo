import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "All",
  colors: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    addColor: (state, action) => {
      state.colors.push(action.payload);
    },
    removeColor: (state, action) => {
      state.colors = state.colors.filter((color) => color !== action.payload);
    },
  },
});

export default filterSlice.reducer;
export const { addColor, changeStatus, removeColor } = filterSlice.actions;
