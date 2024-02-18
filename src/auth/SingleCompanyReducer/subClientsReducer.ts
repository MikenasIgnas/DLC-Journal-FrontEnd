import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompaniesType, EmployeesType, FullSiteData } from '../../types/globalTypes'

interface SubClientsReducer {
    subClient:      CompaniesType | undefined
    companyId?:         string
    companiesEmployees: EmployeesType[]
    fullSiteData:       FullSiteData[]
    siteId?:            string | null
    parentCompanies:    CompaniesType[]
    loading:            boolean
}

const initialState: SubClientsReducer = {
  subClient:          undefined,
  companiesEmployees: [],
  fullSiteData:       [],
  parentCompanies:    [],
  loading:            false,
}

const subClientsSlice = createSlice({
  name:     'subClients',
  initialState,
  reducers: {
    setSubClient(state, { payload }: PayloadAction<CompaniesType | undefined>) {
      state.subClient = payload
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
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    resetSubClientReducer(){
      return initialState
    },
  },
})

export const {
  setSubClient,
  setCompaniesEmployees,
  setCompanyId,
  setFullSiteData,
  setSiteId,
  setParentCompanies,
  setLoading,
  resetSubClientReducer,
} = subClientsSlice.actions

export default subClientsSlice.reducer