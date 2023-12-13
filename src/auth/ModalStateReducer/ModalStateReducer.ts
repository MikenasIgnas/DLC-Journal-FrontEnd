import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalStateReducer {
    openEmployeeAdditionModal:  boolean
    openCompaniesAdditionModal: boolean
    openSubClientAdditionModal: boolean
    openClientsEmployeesDrawer: boolean;
}

const initialState: ModalStateReducer = {
  openEmployeeAdditionModal:  false,
  openCompaniesAdditionModal: false,
  openSubClientAdditionModal: false,
  openClientsEmployeesDrawer: false,
}

const modalSlice = createSlice({
  name:     'modal',
  initialState,
  reducers: {
    setOpenEmployeeAdditionModal(state, { payload }: PayloadAction<boolean>) {
      state.openEmployeeAdditionModal = payload
    },
    setOpenCompaniesAdditionModal(state, { payload }: PayloadAction<boolean>) {
      state.openCompaniesAdditionModal = payload
    },
    setOpenSubClientAdditionModal(state, { payload }: PayloadAction<boolean>) {
      state.openSubClientAdditionModal = payload
    },
  },
})

export const {
  setOpenEmployeeAdditionModal,
  setOpenCompaniesAdditionModal,
  setOpenSubClientAdditionModal,
} = modalSlice.actions

export default modalSlice.reducer