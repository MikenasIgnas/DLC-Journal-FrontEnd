import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompaniesType, EmployeesType, FullSiteData } from '../../types/globalTypes'

interface SingleCompanyReducer {
    singleCompany:      CompaniesType | undefined
    companyId?:         string
    companiesEmployees: EmployeesType[]
    fullSiteData:       FullSiteData[]
    siteId?:            string | null
    parentCompanies:    CompaniesType[]
}

const initialState: SingleCompanyReducer = {
  singleCompany:      undefined,
  companiesEmployees: [],
  fullSiteData:       [],
  parentCompanies:    [],
}

const singleCompanySlice = createSlice({
  name:     'singleCompany',
  initialState,
  reducers: {
    setSingleCompany(state, { payload }: PayloadAction<CompaniesType | undefined>) {
      state.singleCompany = payload
    },
    setParentCompanies(state, { payload }: PayloadAction<CompaniesType[]>) {
      state.parentCompanies = payload
    },
    setCompaniesEmployees(state, { payload }: PayloadAction<EmployeesType[]>){
      state.companiesEmployees = payload
    },
    setFullSiteData(state, { payload }: PayloadAction<FullSiteData[]>){
      state.fullSiteData = payload
    },
    setCompanyId(state, { payload }: PayloadAction<string | undefined>) {
      state.companyId = payload
    },
    setSiteId(state, { payload }: PayloadAction<string | null>) {
      state.siteId = payload
    },
    resetSingleCompanyReducer(){
      return initialState
    },
  },
})

export const {
  setSingleCompany,
  setCompaniesEmployees,
  setCompanyId,
  setFullSiteData,
  setSiteId,
  setParentCompanies,
  resetSingleCompanyReducer,
} = singleCompanySlice.actions

export default singleCompanySlice.reducer