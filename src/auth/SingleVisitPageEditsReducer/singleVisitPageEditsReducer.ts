import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VisitEditsReducer {
    editVisitInformation: boolean
    editVisitors:         boolean
    editCollocations:     boolean
    openVisitorAddition:  boolean
    editClientsGuests:    boolean
}

const initialState: VisitEditsReducer = {
  editVisitInformation: false,
  editVisitors:         false,
  editCollocations:     false,
  openVisitorAddition:  false,
  editClientsGuests:    false,
}
const visitEditsSlice = createSlice({
  name:     'visitEdits',
  initialState,
  reducers: {
    setEditVisitInformation(state, { payload }: PayloadAction<boolean>) {
      state.editVisitInformation = payload
    },
    setEditVisitors(state, { payload }: PayloadAction<boolean>) {
      state.editVisitors = payload
    },
    setEditCollocations(state, { payload }: PayloadAction<boolean>) {
      state.editCollocations = payload
    },
    setOpenVisitorAddition(state, {payload}: PayloadAction<boolean>){
      state.openVisitorAddition = payload
    },
    setEditClientsGuests(state, {payload}: PayloadAction<boolean>){
      state.editClientsGuests = payload
    },
  },
})

export const {
  setEditVisitInformation,
  setEditVisitors,
  setEditCollocations,
  setOpenVisitorAddition,
  setEditClientsGuests,
} = visitEditsSlice.actions

export default visitEditsSlice.reducer