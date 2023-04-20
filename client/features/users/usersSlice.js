import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("users/fetchall", async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const { data } = await axios.get("http://localhost:8080/api/users", {
      headers: { authorization: `${token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUsers = (state) => state.users;
export default usersSlice.reducer;
