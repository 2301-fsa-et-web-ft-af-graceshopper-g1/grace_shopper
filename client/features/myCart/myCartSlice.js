import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Note that "cart items" refer to order products from a user's active order
export const fetchCartItemsAsync = createAsyncThunk(
  "cartItems/fetchAll",
  async (id) => {
    try {
      const response = await axios.get(`/api/cart/${id}`);
      return response.data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cartItems/add",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(`/api/cart/${userId}`, { productId, quantity });
      return response.data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cartItems/edit",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.put(`/api/cart/${userId}`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "removeCartItem",
  async ({ userId, productId, remove }) => {
    try {
      const response = await axios.put(`/api/cart/${userId}`, { productId, remove });
      return response.data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

export const handleCheckoutAsync = createAsyncThunk(
  "handleCheckoutAsync",
  async ({ userId }) => {
    try {
      const checkoutResponse = await axios.put(`/api/cart/checkout/${userId}`, {
        userId,
      });
      return checkoutResponse;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

export const myCartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      return action.payload.products;
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(handleCheckoutAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectMyCart = (state) => state.cart;
export default myCartSlice.reducer;
