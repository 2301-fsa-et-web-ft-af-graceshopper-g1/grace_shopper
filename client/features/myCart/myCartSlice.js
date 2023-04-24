import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Note that "cart items" refer to order products from a user's active order
export const fetchCartItemsAsync = createAsyncThunk(
  "cartItems/fetchAll",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${id}`);
      return response.data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

export const addCartItemAsync = createAsyncThunk("addCartItem", async () => {
  try {
  } catch (err) {
    console.error(err.response.data);
  }
});

export const removeCartItem = createAsyncThunk("removeCartItem", async () => {
  try {
  } catch (err) {
    console.error(err.response.data);
  }
});

export const handleCheckoutAsync = createAsyncThunk(
  "handleCheckoutAsync",
  async () => {
    try {
      const newDate = Date.now();
      const checkoutDate = await axios.put(
        `http://localhost:8080/api/cart/checkout/${userId}`,
        {
          newDate,
        }
      );
      return checkoutDate;
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
    }),
      builder.addCase(handleCheckoutAsync.fulfilled),
      (state, action) => {
        return action.payload;
      };
  },
});

export const selectMyCart = (state) => state.cart;
export default myCartSlice.reducer;
