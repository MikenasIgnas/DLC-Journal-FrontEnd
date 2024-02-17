import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SingleCompanyEditsReducer {
    editClientsEmployee:    boolean
    editCompanyPage:        boolean
}

const initialState: SingleCompanyEditsReducer = {
  editClientsEmployee: false,
  editCompanyPage:     false,
}
const singleCompanyEditsSlice = createSlice({
  name:     'singleCompanyEdits',
  initialState,
  reducers: {
    setEditCompanyEmployee(state, { payload }: PayloadAction<boolean>) {
      state.editClientsEmployee = payload
    },
    setEditCompanyPage(state, { payload }: PayloadAction<boolean>) {
      state.editCompanyPage = payload
    },
    resetSingleCompanyEditReducer(){
      return initialState
    },
  },
})

export const {
  setEditCompanyEmployee,
  setEditCompanyPage,
  resetSingleCompanyEditReducer,
} = singleCompanyEditsSlice.actions

export default singleCompanyEditsSlice.reducer