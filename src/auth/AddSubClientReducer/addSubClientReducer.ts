import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface subClientAdditionReducer {
    isSubClientAdded: boolean
}

const initialState: subClientAdditionReducer = {
  isSubClientAdded: false,
}
const subClientAdditionSlice = createSlice({
  name:     'isSubClientAdded',
  initialState,
  reducers: {
    setIsSubClientAdded(state, { payload }: PayloadAction<boolean>) {
      state.isSubClientAdded = payload
    },
    resetIsSubClientAdded() {
      return initialState
    },
  },
})

export const {
  setIsSubClientAdded,
  resetIsSubClientAdded,
} = subClientAdditionSlice.actions

export default subClientAdditionSlice.reducer