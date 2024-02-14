/* eslint-disable max-len */
import {
  createSlice,
  PayloadAction,
}                  from '@reduxjs/toolkit'

import {
  CompaniesType,
  EmployeesType,
  VisitorEmployee,
  Visitors,
  VisitsType,
  Permissions,
  VisitStatus,
}                   from '../../types/globalTypes'

interface Visits {
    visitor:          Visitors[]
    visit?:           VisitsType
    companyEmployees: EmployeesType[]
    companies:        CompaniesType[]
    permissions:      Permissions[]
    companyId?:       string
    siteId?:          string
    visitStatus:      VisitStatus[]
  }
const initialState: Visits = {
  visitor:          [],
  companyEmployees: [],
  companies:        [],
  permissions:      [],
  visitStatus:      [],
}

const visitReducerSlice = createSlice({
  name:     'visit',
  initialState,
  reducers: {
    setVisitorEmployee(state, { payload }: PayloadAction<VisitorEmployee[]>) {
      state.visitor = payload
    },
    setVisit(state, { payload }: PayloadAction<VisitsType>) {
      state.visit = payload
    },
    setCompanyEmployees(state, { payload }: PayloadAction<EmployeesType[]>) {
      state.companyEmployees = payload
    },

    setVisitors(state, { payload }: PayloadAction<Visitors[]>){
      state.visitor = payload
    },

    addVisitor(state, { payload }: PayloadAction<Visitors>){
      state.visitor.push(payload)
    },
    setCompanies(state, { payload }: PayloadAction<CompaniesType[]>){
      state.companies = payload
    },
    removeVisitor(state, { payload }: PayloadAction<string>){
      const filteredVisitors = state.visitor.filter((el) => el._id !== payload)
      state.visitor = filteredVisitors
    },
    setPermissions(state, { payload }: PayloadAction<Permissions[]>){
      state.permissions = payload
    },
    setVisitStatus(state, { payload }: PayloadAction<VisitStatus[]>){
      state.visitStatus = payload
    },
    setCompanyId(state, { payload }: PayloadAction<string | undefined>){
      state.companyId = payload
    },
    setSiteId(state, { payload }: PayloadAction<string | undefined>){
      state.siteId = payload
    },
    resetVisitReducer() {
      return initialState
    },
  },
})

export const {
  setVisitorEmployee,
  setVisit,
  setCompanyEmployees,
  addVisitor,
  removeVisitor,
  setVisitors,
  setCompanies,
  setPermissions,
  setCompanyId,
  setSiteId,
  setVisitStatus,
  resetVisitReducer,
} = visitReducerSlice.actions

export default visitReducerSlice.reducer