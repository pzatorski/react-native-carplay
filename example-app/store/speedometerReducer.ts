import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const speedometerSlice = createSlice({
  name: 'speedometer',
  initialState: {
    speed: 0,
  },
  reducers: {
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
  },
});

export const { setSpeed } = speedometerSlice.actions;

export default speedometerSlice.reducer;
