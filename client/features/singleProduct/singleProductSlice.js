import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProductAsync = createAsyncThunk(
  "singleProduct/fetchOne",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}`
    );
    return response.data;
  }
);

export const addSingleProductAsync = createAsyncThunk(
  "addSingleProduct",
  async ({ name, price, imageUrl, description, stock }) => {
    try {
      const token = localStorage.getItem("token");
      //console.log(token);
      const { data } = await axios.post(
        "http://localhost:8080/api/products",
        {
          name,
          price,
          imageUrl,
          description,
          stock,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateSingleProductAsync = createAsyncThunk(
  "updateSingleProduct",
  async ({ id, name, price, imageUrl, description, stock }) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `/api/products/${id}`,
        {
          name,
          price,
          imageUrl,
          description,
          stock,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSingleProductAsync = createAsyncThunk(
  "deleteSingleProduct",
  async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return "deleted";
    } catch (error) {
      console.log(error);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addSingleProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectSingleProduct = (state) => state.product;

export default singleProductSlice.reducer;
