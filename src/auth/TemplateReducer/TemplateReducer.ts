import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TemplateReducer {
    value: boolean
}

const initialState: TemplateReducer = {
  value: false,
}
const templateSlice = createSlice({
  name:     'template',
  initialState,
  reducers: {
    setTemplateReducer(state, { payload }: PayloadAction<boolean>) {
      state.value = payload
    },
  },
})

export const {
  setTemplateReducer,
} = templateSlice.actions

export default templateSlice.reducer