/* eslint-disable max-len */
import React               from 'react'
import { get }             from './helpers'
import {
  EmployeesType,
  Visitors,
  VisitsType,
  Permissions,
  VisitStatus,
  VisitorsIdTypes,
}                          from '../types/globalTypes'
import { useCookies }      from 'react-cookie'
import {
  useAppDispatch,
  useAppSelector,
}                          from '../store/hooks'
import {
  setCompanyEmployees,
  setCompanyId,
  setPermissions,
  setVisit,
  setVisitors,
  setSiteId,
  setCompanies,
  setVisitStatus,
  setVisitorIdTypes,
  setDlcEmployee,
  setClientsGuests,
  setCarPlates,
}                             from '../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { useSearchParams }    from 'react-router-dom'

const useFetchVisitData = () => {
  const [cookies]                   = useCookies(['access_token'])
  const dispatch                    = useAppDispatch()
  const [searchParams]              = useSearchParams()
  const visitId                     = searchParams.get('_id')
  const siteId                      = searchParams.get('siteId')
  const companyId                   = searchParams.get('companyId')
  const editRacks                   = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const editVisitInformation        = useAppSelector((state) => state.visitPageEdits.editVisitInformation)

  React.useEffect(() => {
    try{
      const fetchData = async () => {
        const companies                               = await get('company/company', cookies.access_token)
        const visitStatusRes: VisitStatus[]           = await get('visit/visitStatus', cookies.access_token)
        if(visitId && cookies.access_token){
          const singleVisitRes: VisitsType            = await get(`visit/visit/?_id=${visitId}`, cookies.access_token)
          const companyEmployeesRes: EmployeesType[]  = await get(`company/CompanyEmployee?companyId=${companyId}`, cookies.access_token)
          const visitors: Visitors[]                  = await get(`visit/visitor?visitId=${visitId}`, cookies.access_token)
          const permissions: Permissions[]            = await get('company/permission', cookies.access_token)
          const visitorsIdTypes: VisitorsIdTypes[]    = await get('visit/visitorIdType', cookies.access_token)

          if(companyId){
            dispatch(setCompanyId(companyId))
          }

          if(siteId){
            dispatch(setSiteId(siteId))
          }

          if(singleVisitRes.dlcEmployee){
            const dlcEmployee: EmployeesType           = await get(`user?id=${singleVisitRes.dlcEmployee}`, cookies.access_token)
            dispatch(setDlcEmployee(dlcEmployee))
          }

          dispatch(setVisitorIdTypes(visitorsIdTypes))
          dispatch(setPermissions(permissions))
          dispatch(setVisit(singleVisitRes))
          dispatch(setVisitors(visitors))
          dispatch(setClientsGuests(singleVisitRes.guests))
          dispatch(setCarPlates(singleVisitRes.carPlates))
          dispatch(setCompanyEmployees(companyEmployeesRes))
        }
        dispatch(setCompanies(companies))
        dispatch(setVisitStatus(visitStatusRes))
      }

      fetchData()
    }catch(error){
      if(error instanceof Error){
        alert(error.message)
      }
    }

  }, [cookies.access_token, dispatch, visitId, siteId, companyId, editRacks, editVisitInformation])

}

export default useFetchVisitData