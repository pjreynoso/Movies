import { createSlice } from '@reduxjs/toolkit';

export const inningSlice = createSlice({
  name: 'inning',
  initialState: {
    innings: [],
  },
  reducers: {
    createInning: (state, action) => {
      state.innings.push(action.payload)
    },
    editInningById: (state, action) => {
      const { id, ...fields } = action.payload
      const { innings } = state

      const inningIndex = state.innings.findIndex(e => e.id === id)
      const inning = innings[inningIndex]

      innings[inningIndex] = { ...inning, ...fields }
    },
    removeInningById: (state, action) => {
      const id = action.payload 

      state.innings = state.innings.filter(e => e.id !== id)
    },
  },
});

export const { createInning, editInningById, removeInningById } = inningSlice.actions;

export const selectInning = state => state.inning.innings;

export default inningSlice.reducer;
