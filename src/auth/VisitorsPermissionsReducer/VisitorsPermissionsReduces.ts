import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PermissionsReducer {
    permissions: string[]
}

const initialState: PermissionsReducer = {
  permissions: [],
}
const permissionsSlice = createSlice({
  name:     'permissions',
  initialState,
  reducers: {
    setPermissions(state, { payload }: PayloadAction<string[]>) {
      state.permissions = payload
    },
  },
})

export const {
  setPermissions,
} = permissionsSlice.actions

export default permissionsSlice.reducer