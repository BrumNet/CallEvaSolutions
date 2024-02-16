import { createSlice } from "@reduxjs/toolkit";

const reduxFunctions = createSlice({
  name: "user",
  initialState: {
    value: "undefined",
  },
  reducers: {
    setprovider: (state) => {
      state.value = "provider";
    },
    setcustomer: (state) => {
      state.value = "customer";
    },
    setadmin: (state) => {
      state.value = "admin";
    },
    setdefault: (state) => {
      state.value = "undefined";
    },
  },
});

export const { setprovider, setcustomer, setadmin, setdefault } =
  reduxFunctions.actions;

export default reduxFunctions.reducer;
