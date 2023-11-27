/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VisitsType } from '../../types/globalTypes'
interface fetchedTableDataReducerState {
  visitsTableData:       VisitsType[] | null;
}

const initialState: fetchedTableDataReducerState = {
  visitsTableData: null,
}

const visitsDataReducer = createSlice({
  name:     'visitTableReducer',
  initialState,
  reducers: {
    setVisitsTableData(state: fetchedTableDataReducerState, { payload }: PayloadAction<VisitsType[]>) {
      state.visitsTableData = payload
    },
    resetTableDataReducer() {
      return initialState
    },
  },
})

export const {
  resetTableDataReducer,
  setVisitsTableData,
} = visitsDataReducer.actions

export default visitsDataReducer.reducer