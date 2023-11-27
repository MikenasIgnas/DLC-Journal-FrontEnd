/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../types/globalTypes'
interface fetchedTableDataReducerState {
  usersTableData:       UserType[] | null;
}

const initialState: fetchedTableDataReducerState = {
  usersTableData: null,
}

const usersDataReducer = createSlice({
  name:     'usersTableReducer',
  initialState,
  reducers: {
    setUsersTableData(state: fetchedTableDataReducerState, { payload }: PayloadAction<UserType[]>) {
      state.usersTableData = payload
    },
    resetUsersDataReducer() {
      return initialState
    },
  },
})

export const {
  resetUsersDataReducer,
  setUsersTableData,
} = usersDataReducer.actions

export default usersDataReducer.reducer