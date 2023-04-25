import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllOrders = createAsyncThunk("orders/fetchAll", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/cart/orders", {
      headers: { authorization: `${token}` },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const allOrdersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectOrders = (state) => state.orders;
export default allOrdersSlice.reducer;
