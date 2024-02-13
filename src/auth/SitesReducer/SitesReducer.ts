import { createSlice, PayloadAction }           from '@reduxjs/toolkit'
import { Sites, Premises, Racks, FullSiteData } from '../../types/globalTypes'

interface SitesReducer {
    fullSiteData:   FullSiteData[]
    site:           Sites[] | null
    premise:        Premises[] | null
    racks:          Racks[] | null
}

const initialState: SitesReducer = {
  fullSiteData: [],
  site:         null,
  premise:      null,
  racks:        null,
}

const siteSlice = createSlice({
  name:     'sites',
  initialState,
  reducers: {
    setFullSiteData(state, { payload }: PayloadAction<FullSiteData[]>){
      state.fullSiteData = payload
    },
    setSite(state, { payload }: PayloadAction<Sites[] | null>) {
      state.site = payload
    },
    setPremise(state, { payload }: PayloadAction<Premises[] | null>) {
      state.premise = payload
    },
    setRacks(state, { payload }: PayloadAction<Racks[] | null>) {
      state.racks = payload
    },
  },
})

export const {
  setFullSiteData,
  setSite,
  setPremise,
  setRacks,
} = siteSlice.actions

export default siteSlice.reducer