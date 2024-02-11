/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                from 'react'

import {
  CompaniesType,
  EmployeesType,
  Guest,
  Permissions,
  Premises,
  Racks,
  Sites,
  VisitPurpose,
  VisitStatus,
  Visitors,
  VisitorsIdTypes,
  VisitsType,
}
  from '../types/globalTypes'

import { useCookies }                     from 'react-cookie'
import { useParams }                      from 'react-router'
import { get }                            from './helpers'
import { useSearchParams }                from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setPremise, setRacks, setSite }  from '../auth/SitesReducer/SitesReducer'

const useSetSingleVisitData = () => {
  const [cookies]                               = useCookies(['access_token'])
  const [visitData, setVisitData]               = React.useState<VisitsType>()
  const {id}                                    = useParams()
  const [searchParams]                          = useSearchParams()
  const visitAddress                            = searchParams.get('visitAddress')
  const [companyEmployees, setCompanyEmployees] = React.useState<EmployeesType[]>([])
  const editVisitInformation                    = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const editVisitors                            = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const editCollocations                        = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const [sites, setSites]                       = React.useState<Sites[] | undefined>([])
  const [company, setCompany]                   = React.useState<CompaniesType | undefined>()
  const [companies, setCompanies]               = React.useState<CompaniesType[]>([])
  const [visitPurpose, setVisitPurpose]         = React.useState<VisitPurpose[]>([])
  const [permissions, setPermissions]           = React.useState<Permissions[]>([])
  const [visitorIdTypes, setVisitorIdTypes]     = React.useState<VisitorsIdTypes[]>([])
  const [visitors, setVisitors]                 = React.useState<Visitors[]>([])
  const [companyPremise, setCompanyPremise]     = React.useState<Premises[]>([])
  const [guests, setGuests]                     = React.useState<Guest[] | undefined>([])
  const [companyRacks, setCompanyRacks]         = React.useState<Racks[] | undefined >([])
  const [carPlates, setCarPlates]               = React.useState<string[] | undefined>([])
  const [visitStatus, setVisitStatus]           = React.useState<VisitStatus>()
  const [visitStatuses, setVisitStatuses]       = React.useState<VisitStatus[] | undefined>([])
  const dispatch                                = useAppDispatch()
  const [selectedVisitors, setSelectedVisitors] = React.useState<string[]>([])


  const fetchData = async () => {
    try {
      const singleVisitRes: VisitsType            = await get(`visit/visit/?id=${id}`, cookies.access_token)
      const company                               = await get(`company/company?id=${singleVisitRes.companyId}`, cookies.access_token)
      const siteRes: Sites[]                      = await get('site/site', cookies.access_token)
      const companyRes: CompaniesType             = await get(`company/company?id=${singleVisitRes.companyId}`, cookies.access_token)
      const companiesRes:CompaniesType[]          = await get('company/company', cookies.access_token)
      const visitorsRes: Visitors[]               = await get(`visit/visitor?visitId=${singleVisitRes._id}&page=1&limit=10`, cookies.access_token)

      const visitPurposeRes: VisitPurpose[]       = await get('company/permission', cookies.access_token)
      const filteredItems                         = visitPurposeRes.filter(item => singleVisitRes.visitPurpose?.includes(item._id))
      const companyEmployeesRes: EmployeesType[]  = await get(`company/CompanyEmployee?companyId=${companyRes._id}&page=1&limit=10`, cookies.access_token)
      const permissionsRes: Permissions[]         = await get('company/permission', cookies.access_token)
      const premiseRes: Premises[]                = await get('site/premise', cookies.access_token)
      const racksRes: Racks[]                     = await get('site/rack', cookies.access_token)
      const visitorIdTypesRes: VisitorsIdTypes[]  = await get('visit/visitorIdType', cookies.access_token)

      const siteByPrmise                          = premiseRes.filter((el) => el.siteId === visitAddress)
      const premiseIds                            = siteByPrmise.map((el) => el._id)

      const companiesByRacks                      = racksRes.filter(item => company.racks.includes(item._id))
      const companiesRacks                        = companiesByRacks.filter((el) => premiseIds.includes(el.premiseId))
      const racksPremiseIds                       = companiesRacks.map((el) => el.premiseId)
      const premise                               = siteByPrmise.filter((el) => racksPremiseIds.includes(el._id))

      const visitStatusRes                        = await get(`visit/visitStatus?id=${singleVisitRes?.statusId}`, cookies.access_token)
      const visitStatusesRes                      = await get('visit/visitStatus', cookies.access_token)

      const filteredArray = companyEmployeesRes.filter((visitor) =>
        !visitorsRes.some(
          (filterItem) =>
            filterItem.employeeId === visitor._id
        )
      )
      setCompanyEmployees(filteredArray)



      setVisitStatus(visitStatusRes)
      setVisitStatuses(visitStatusesRes)
      setCompanyPremise(premise)
      setCarPlates(singleVisitRes.carPlates)
      setCompanyRacks(companiesRacks)
      setGuests(singleVisitRes.guests)
      setVisitors(visitorsRes)
      setVisitorIdTypes(visitorIdTypesRes)
      dispatch(setSite(siteRes))
      dispatch(setPremise(premiseRes))
      dispatch(setRacks(racksRes))
      setPermissions(permissionsRes)
      setCompanies(companiesRes)
      setVisitPurpose(filteredItems)
      setSites(siteRes)
      setCompany(companyRes)
      setVisitData(singleVisitRes)
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [open, visitAddress, editVisitors, editVisitInformation, editCollocations])

  return {
    visitData,
    visitAddress,
    company,
    companyEmployees,
    visitPurpose,
    companies,
    sites,
    id,
    cookies,
    visitors,
    setCompanyEmployees,
    permissions,
    visitorIdTypes,
    guests,
    setGuests,
    companyPremise,
    companyRacks,
    setVisitData,
    setSelectedVisitors,
    carPlates,
    setCarPlates,
    visitStatus,
    visitStatuses,
    fetchData,
    setVisitors,
  }
}

export default useSetSingleVisitData