import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProductAsync = createAsyncThunk(
  "singleProducts/fetchOne",
  async (id) => {
    // console.log("the id", id);
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}`
    );
    console.log("the data", response.data);
    return response.data;
  }
);

export const singleProductSlice = createSlice({
  name: "singleProducts",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => state.product;

export default singleProductSlice.reducer;
