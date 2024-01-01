/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface fetchedTableDataReducerState<T> {
    fetchedVisitsTableData:       T[] | null;
}

const initialState: fetchedTableDataReducerState<any> = {
  fetchedVisitsTableData: null,
}

const fetchesVisitsDataReducer = createSlice({
  name:     'fetchedTableDataReducer',
  initialState,
  reducers: {
    setFetchesVisitsDataReducer<T>(state: fetchedTableDataReducerState<T>, { payload }: PayloadAction<T[]>) {
      state.fetchedVisitsTableData = payload
    },
    resetReducer() {
      return initialState
    },
  },
})

export const {
  resetReducer,
  setFetchesVisitsDataReducer,
} = fetchesVisitsDataReducer.actions

export default fetchesVisitsDataReducer.reducer