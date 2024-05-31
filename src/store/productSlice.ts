import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Product } from "../interface/Product";
import { API_BASE_URL } from "../constants";
import { InitialStateProps } from "../interface/InitialStateProps";

export const initialState: InitialStateProps<Product[]> = {
  data: [],
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;

export const productsSelector = (state: RootState) => state.products;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const result = await response.json();
  return result;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  const result = await response.json();
  return result;
};
