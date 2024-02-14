/* eslint-disable max-len */
import React                from 'react'
import { get }              from './helpers'
import {
  EmployeesType,
  Visitors,
  VisitsType,
  Permissions,
  VisitStatus,
}                           from '../types/globalTypes'
import { useCookies }       from 'react-cookie'
import { useAppDispatch }   from '../store/hooks'
import {
  resetVisitReducer,
  setCompanyEmployees,
  setCompanyId,
  setPermissions,
  setVisit,
  setVisitors,
  setSiteId,
  setCompanies,
  setVisitStatus,
}                           from '../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { useSearchParams }  from 'react-router-dom'

const useFetchVisitData = () => {
  const [cookies]       = useCookies(['access_token'])
  const dispatch        = useAppDispatch()
  const [searchParams]  = useSearchParams()
  const visitId         = searchParams.get('id')
  const siteId          = searchParams.get('siteId')
  const companyId       = searchParams.get('companyId')
  React.useEffect(() => {
    const fetchData = async () => {
      const companies                               = await get('company/company', cookies.access_token)
      if(visitId && cookies.access_token){
        const singleVisitRes: VisitsType            = await get(`visit/visit/?id=${visitId}`, cookies.access_token)
        const visitStatusRes: VisitStatus[]         = await get('visit/visitStatus', cookies.access_token)
        const companyEmployeesRes: EmployeesType[]  = await get(`company/CompanyEmployee?companyId=${companyId}`, cookies.access_token)
        const visitors: Visitors[]                  = await get(`visit/visitor?visitId=${visitId}`, cookies.access_token)
        const permissions: Permissions[]            = await get('company/permission', cookies.access_token)

        if(companyId){
          dispatch(setCompanyId(companyId))
        }

        if(siteId){
          dispatch(setSiteId(siteId))
        }

        dispatch(setVisitStatus(visitStatusRes))
        dispatch(setPermissions(permissions))
        dispatch(setVisit(singleVisitRes))
        dispatch(setVisitors(visitors))
        dispatch(setCompanyEmployees(companyEmployeesRes))
      }
      dispatch(setCompanies(companies))
    }

    fetchData()
    return () => {
      dispatch(resetVisitReducer())
    }
  }, [cookies.access_token, dispatch, visitId, siteId, companyId])
}

export default useFetchVisitData