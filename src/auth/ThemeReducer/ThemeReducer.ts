import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeReducer {
    value: boolean
}

const initialState: ThemeReducer = {
  value: false,
}
const themeSlice = createSlice({
  name:     'theme',
  initialState,
  reducers: {
    setDefaultTheme(state, { payload }: PayloadAction<boolean>) {
      state.value = payload
    },
  },
})

export const {
  setDefaultTheme,
} = themeSlice.actions

export default themeSlice.reducer