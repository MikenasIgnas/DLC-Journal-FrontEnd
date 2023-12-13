/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface fetchedTableDataReducerState<T> {
  fetchedTableData:       T[] | null;
}

const initialState: fetchedTableDataReducerState<any> = {
  fetchedTableData: null,
}

const fethedTableDataReducer = createSlice({
  name:     'fetchedTableDataReducer',
  initialState,
  reducers: {
    setFetchedTableData<T>(state: fetchedTableDataReducerState<T>, { payload }: PayloadAction<T[]>) {
      state.fetchedTableData = payload
    },
    resetReducer() {
      return initialState
    },
  },
})

export const {
  resetReducer,
  setFetchedTableData,
} = fethedTableDataReducer.actions

export default fethedTableDataReducer.reducer