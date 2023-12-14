import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CollocationReducer {
    collocationItem: {
        premiseName:  string;
        racks:        string[];
        addressId?:   string | null
      }
}

const initialState: CollocationReducer = {
  collocationItem: {premiseName: '', racks: [], addressId: null},
}

const collocationSlice = createSlice({
  name:     'collocation',
  initialState,
  reducers: {
    setCollocationItem(state, { payload }: PayloadAction<{
        premiseName:  string;
        racks:        string[];
        addressId?:   string | null
      }>) {
      state.collocationItem = payload
    },
  },
})

export const {
  setCollocationItem,
} = collocationSlice.actions

export default collocationSlice.reducer