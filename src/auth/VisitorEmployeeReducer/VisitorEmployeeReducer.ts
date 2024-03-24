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
  VisitorsIdTypes,
  Guest,
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
    visitorIdTypes:   VisitorsIdTypes[]
    dlcEmployee?:     EmployeesType;
    guests:           Guest[]
    carPlates?:       string[] | undefined
  }

const initialState: Visits = {
  visitor:          [],
  companyEmployees: [],
  companies:        [],
  permissions:      [],
  visitStatus:      [],
  visitorIdTypes:   [],
  guests:           [],
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
    setVisitorIdTypes(state, { payload }: PayloadAction<VisitorsIdTypes[]>){
      state.visitorIdTypes = payload
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
    setDlcEmployee(state, { payload }: PayloadAction<EmployeesType>){
      state.dlcEmployee = payload
    },
    setSiteId(state, { payload }: PayloadAction<string | undefined>){
      state.siteId = payload
    },
    setClientsGuests(state, { payload }: PayloadAction<Guest[]>){
      state.guests = payload
    },
    addCarPlates(state, { payload }: PayloadAction<string>){
      state?.carPlates?.push(payload)
    },
    removeCarPlates(state, { payload }: PayloadAction<number>){
      const filterCarPlates = state.carPlates?.filter((_, i) => i !== payload)
      state.carPlates = filterCarPlates
    },
    addGuests(state, { payload }: PayloadAction<Guest>){
      state?.guests?.push(payload)
    },
    removeGuest(state, { payload }: PayloadAction<string | undefined>){
      const filteredVisitors = state.guests?.filter((item) => item._id !== payload)
      state.guests = filteredVisitors
    },
    setCarPlates(state, { payload }: PayloadAction<string[] | undefined>){
      state.carPlates = payload
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
  setVisitorIdTypes,
  setDlcEmployee,
  resetVisitReducer,
  setCarPlates,
  addCarPlates,
  addGuests,
  removeGuest,
  setClientsGuests,
  removeCarPlates,
} = visitReducerSlice.actions

export default visitReducerSlice.reducer