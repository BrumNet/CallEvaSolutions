import { createSlice } from '@reduxjs/toolkit'

const reduxFunctions = createSlice({
  name: 'user',
  initialState: {
    value: 'undefined',
  },
  reducers: {
    setprovider: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      
      state.value = "provider";
    },
    setcustomer: (state) => {
      state.value = "customer"
    },
    setadmin: (state) => {
      state.value = "admin"
    },
    setdefault: (state) => {
      state.value = "undefined"
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setprovider, setcustomer, setadmin, setdefault } = reduxFunctions.actions

export default reduxFunctions.reducer