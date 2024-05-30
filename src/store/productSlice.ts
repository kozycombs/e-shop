import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Product } from "../interface/Product";

export const initialState: Product[] = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;

export const productsSelector = (state: RootState) => state.products;
