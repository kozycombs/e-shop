import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { API_BASE_URL } from "../constants";
import { InitialStateProps } from "../interface/InitialStateProps";
import { Cart, CartProduct } from "../interface/Cart";

export const initialState: InitialStateProps<Cart | null> = {
  data: null,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state: RootState) => state.cart;

export const addToCart = async (
  userId: number,
  date: string,
  products: CartProduct[]
): Promise<Cart> => {
  const response = await fetch(`${API_BASE_URL}/carts`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      date,
      products,
    }),
  });
  const result = await response.json();
  return result;
};

export const updateCartProduct = async (
  cartId: number,
  userId: number,
  date: string,
  products: CartProduct[]
): Promise<Cart> => {
  const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      date,
      products,
    }),
  });
  const result = await response.json();
  return result;
};
