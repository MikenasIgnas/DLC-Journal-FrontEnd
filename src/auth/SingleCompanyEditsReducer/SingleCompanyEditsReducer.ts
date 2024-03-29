import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SingleCompanyEditsReducer {
    editClientsEmployee:    boolean
    editCompanyPage:        boolean
    editCompanyRacks:       boolean
}

const initialState: SingleCompanyEditsReducer = {
  editClientsEmployee: false,
  editCompanyPage:     false,
  editCompanyRacks:    false,
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
    setEditCompanyRacks(state, { payload }: PayloadAction<boolean>) {
      state.editCompanyRacks = payload
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
  setEditCompanyRacks,
} = singleCompanyEditsSlice.actions

export default singleCompanyEditsSlice.reducer