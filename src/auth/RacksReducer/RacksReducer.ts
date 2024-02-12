import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Premises, Racks } from '../../types/globalTypes'

interface RacksReducer {
    racks:       Racks[]
    checkedList: string[]
    premise:     Premises[]
}

const initialState: RacksReducer = {
  racks:       [],
  checkedList: [],
  premise:     [],
}
const racksSlice = createSlice({
  name:     'racks',
  initialState,
  reducers: {
    setCompanyRacks(state, { payload }: PayloadAction<Racks[]>) {
      state.racks = payload
    },
    setCheckedList(state, { payload }: PayloadAction<string[]>) {
      state.checkedList = payload
    },
    setPermise(state, { payload }: PayloadAction<Premises[]> ) {
      state.premise = payload
    },
  },
})

export const {
  setCompanyRacks,
  setCheckedList,
  setPermise,
} = racksSlice.actions

export default racksSlice.reducer