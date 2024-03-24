/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthReducer {
    id?:           string,
    secret?:       string,
    name?:         string | null,
    userEmail?:    string,
    usersRole?:    string,
    routeNumber:   number,
    edit:          boolean,
    isAdmin:       boolean | null
    isSecurity:    boolean | null
    recoveryCode?: string
  }

const initialState: AuthReducer = {
  routeNumber: 1,
  edit:        true,
  isAdmin:     null,
  isSecurity:  null,
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
    setIsAdmin (state, { payload }: PayloadAction<boolean>){
      state.isAdmin = payload
    },
    setIsSecurity (state, { payload }: PayloadAction<boolean>){
      state.isSecurity = payload
    },
    setRecoveryCode (state, { payload }: PayloadAction<string>){
      state.recoveryCode = payload.toLowerCase()
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
  setIsAdmin,
  setIsSecurity,
  setRecoveryCode,
} = authSlice.actions

export default authSlice.reducer