import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { API_BASE_URL } from "../constants";
import { InitialStateProps } from "../interface/InitialStateProps";
import { Cart, CartProduct } from "../interface/Cart";

export const initialState: InitialStateProps<Cart | null> = {
  loading: false,
  data: null,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: { payload: Cart }) => {
      state.data = action.payload;
    },
    resetCart: () => {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { updateCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state: RootState) => state.cart;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId,
    date,
    products,
  }: {
    userId: number;
    date: string;
    products: CartProduct[];
  }): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        date,
        products,
      }),
    });
    const result = await response.json();
    return {
      id: Number(result.id),
      userId,
      date,
      products,
    };
  }
);

export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async ({
    cartId,
    userId,
    date,
    products,
  }: {
    cartId: number;
    userId: number;
    date: string;
    products: CartProduct[];
  }): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "PUT",
      body: JSON.stringify({
        userId,
        date,
        products,
      }),
    });
    const result = await response.json();
    return {
      id: Number(result.id),
      userId,
      date,
      products,
    };
  }
);
