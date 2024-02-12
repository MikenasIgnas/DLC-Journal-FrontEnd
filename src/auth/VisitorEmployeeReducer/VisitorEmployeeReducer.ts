/* eslint-disable max-len */
import { createSlice, PayloadAction }   from '@reduxjs/toolkit'
import { CompaniesType, EmployeesType, VisitorEmployee, Visitors, VisitsType, Permissions }              from '../../types/globalTypes'

interface Visits {
    visitor:            Visitors[]
    visit?:             VisitsType
    company?:           CompaniesType
    companyEmployees:   EmployeesType[]
    companies:          CompaniesType[]
    permissions:        Permissions[]
}
const initialState: Visits = {
  visitor:          [],
  companyEmployees: [],
  companies:        [],
  permissions:      [],
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
    setCompany(state, { payload }: PayloadAction<CompaniesType>) {
      state.company = payload
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
    resetVisitReducer() {
      return initialState
    },
  },
})

export const {
  setVisitorEmployee,
  setVisit,
  setCompany,
  setCompanyEmployees,
  addVisitor,
  removeVisitor,
  setVisitors,
  setCompanies,
  setPermissions,
  resetVisitReducer,
} = visitReducerSlice.actions

export default visitReducerSlice.reducer