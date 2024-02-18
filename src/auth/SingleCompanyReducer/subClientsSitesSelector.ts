/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit'

import {
  CompaniesType,
  FullSiteData,
  PremiseRacks,
  Racks,
  RootState,
} from '../../types/globalTypes'

const fullSiteData  = (state: RootState) => state.singleCompany.fullSiteData
const selectCompany = (state: RootState) => state.subClient.subClient
const siteId        = (state: RootState) => state.subClient.siteId

const findSite      = (sites: FullSiteData[], siteId: string | null | undefined) => {
  const site = sites.find((el) => el._id === siteId)
  return site
}

export const selectSite =  createSelector(
  [fullSiteData, siteId],
  findSite
)

const findPremises = (sites: FullSiteData | undefined, company: CompaniesType | undefined) => {
  const premise = sites?.premises?.filter((el) => el.racks.some((item) => item._id && company?.racks.includes(item._id)))
  return premise
}

export const selectPremises = createSelector(
  [selectSite, selectCompany],
  findPremises
)

const findRacks = (premise: PremiseRacks[] | undefined, company: CompaniesType | undefined, premiseId: string | null) => {
  const racks: Racks[] = []
  if(premise && company && premiseId){
    const allPremiseRacks = premise.find((el) => el._id === premiseId)?.racks
    if(allPremiseRacks){
      for (let index = 0; index < allPremiseRacks.length; index++) {
        const element = allPremiseRacks[index]
        if(element._id && company.racks.includes(element._id)){
          racks.push(element)
        }
      }
    }
  }
  return racks
}

export const selectRacks = createSelector(
  [ selectPremises, selectCompany, (_: RootState, premiseId: string | null) => premiseId],
  findRacks
)
