/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthReducer {
    id?:                    string,
    secret?:                string,
    username?:              string | null,
    userEmail?:             string,
    usersRole?:             string,
    routeNumber:            number,
    edit:                   boolean,
  }

const initialState: AuthReducer = {
  routeNumber: 1,
  edit:        true,
}
const authSlice = createSlice({
  name:     'auth',
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<{ id: string, username: string, secret: string}>) {
      state.id = payload.id
      state.username = payload.username
      state.secret = payload.secret
    },
    setUsername(state, { payload }: PayloadAction<string>) {
      state.username = payload
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
  setUsername,
  clearUserData,
  setUserEmail,
  setUsersRole,
  setPostEdit,
} = authSlice.actions

export default authSlice.reducer
