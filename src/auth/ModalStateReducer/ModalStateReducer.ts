import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalStateReducer {
    openEmployeeAdditionModal:    boolean;
    openCompaniesAdditionModal:   boolean;
    openSubClientAdditionModal:   boolean;
    openClientsEmployeesDrawer:   boolean;
    openCollocationAdditionModal: boolean;
    openCollocationRemovalModal:  boolean;
    openRacksAdditionModal:       boolean;
}

const initialState: ModalStateReducer = {
  openEmployeeAdditionModal:    false,
  openCompaniesAdditionModal:   false,
  openSubClientAdditionModal:   false,
  openClientsEmployeesDrawer:   false,
  openCollocationAdditionModal: false,
  openCollocationRemovalModal:  false,
  openRacksAdditionModal:       false,
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
    setOpenClientsEmployeesDrawer(state, { payload }: PayloadAction<boolean>) {
      state.openClientsEmployeesDrawer = payload
    },
    setOpenCollocationAdditionModal(state, { payload }: PayloadAction<boolean>) {
      state.openCollocationAdditionModal = payload
    },
    setOpenCollocationRemovalModal(state, { payload }: PayloadAction<boolean>) {
      state.openCollocationRemovalModal = payload
    },
    setOpenRacksAdditionModal(state, { payload }: PayloadAction<boolean>){
      state.openRacksAdditionModal = payload
    },
  },
})

export const {
  setOpenEmployeeAdditionModal,
  setOpenCompaniesAdditionModal,
  setOpenSubClientAdditionModal,
  setOpenCollocationAdditionModal,
  setOpenCollocationRemovalModal,
  setOpenClientsEmployeesDrawer,
  setOpenRacksAdditionModal,
} = modalSlice.actions

export default modalSlice.reducer