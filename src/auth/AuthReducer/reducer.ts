/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthReducer {
    id?:         string,
    secret?:     string,
    name?:       string | null,
    userEmail?:  string,
    usersRole?:  string,
    routeNumber: number,
    edit:        boolean,
  }

const initialState: AuthReducer = {
  routeNumber: 1,
  edit:        true,
}
const authSlice = createSlice({
  name:     'auth',
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<{ id: string, name: string, secret: string}>) {
      state.id = payload.id
      state.name = payload.name
      state.secret = payload.secret
    },
    setEmployeeName(state, { payload }: PayloadAction<string>) {
      state.name = payload
    },
    clearUserData() {
      return initialState
    },
    setRouteNumber(state, { payload }: PayloadAction<number>) {
      state.routeNumber = payload
    },
    setUserEmail (state, { payload }: PayloadAction<string>){
      state.userEmail = payload
    },
    setUsersRole (state, { payload }: PayloadAction<string>){
      state.usersRole = payload
    },
    setPostEdit (state, { payload }: PayloadAction<boolean>){
      state.edit = payload
    },
  },
})

export const {
  setUserData,
  setEmployeeName,
  clearUserData,
  setUserEmail,
  setUsersRole,
  setPostEdit,
} = authSlice.actions

export default authSlice.reducer