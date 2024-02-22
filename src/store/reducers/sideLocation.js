import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sideLocation: "dashboard",
  },
  reducers: {
    setSideLocation: (state, action) => {
      state.sideLocation = action.payload
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { setSideLocation, decrement } = counterSlice.actions;
export default counterSlice.reducer;