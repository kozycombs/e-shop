import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/index";
import { Product } from "interface/Product";
import { API_BASE_URL } from "constants/index";
import { InitialStateProps } from "interface/InitialStateProps";

export const initialState: InitialStateProps<Product[]> = {
  loading: false,
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
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Failed to load our products. Please try again later";
      });
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;

export const productsSelector = (state: RootState) => state.products;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    const result = await response.json();
    return result;
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchPoduct",
  async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const result = await response.json();
    return result;
  }
);
