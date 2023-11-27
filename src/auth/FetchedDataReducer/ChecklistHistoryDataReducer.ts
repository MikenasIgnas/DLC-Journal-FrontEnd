/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HistoryDataType } from '../../types/globalTypes'
interface fetchedTableDataReducerState {
  checklistHistoryTableData:       HistoryDataType[] | null;
}

const initialState: fetchedTableDataReducerState = {
  checklistHistoryTableData: null,
}

const checklistDataReducer = createSlice({
  name:     'checklistHistoryTableReducer',
  initialState,
  reducers: {
    setChecklistHistoryTableData(state: fetchedTableDataReducerState, { payload }: PayloadAction<HistoryDataType[]>) {
      state.checklistHistoryTableData = payload
    },
    resetChecklistHistoryDataReducer() {
      return initialState
    },
  },
})

export const {
  resetChecklistHistoryDataReducer,
  setChecklistHistoryTableData,
} = checklistDataReducer.actions

export default checklistDataReducer.reducer