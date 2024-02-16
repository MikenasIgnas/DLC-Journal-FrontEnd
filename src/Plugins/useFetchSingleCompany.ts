/* eslint-disable max-len */
import React                             from 'react'
import { get }                           from './helpers'
import { useCookies }                    from 'react-cookie'
import {
  useParams,
  useSearchParams,
}                                        from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
}                                        from '../store/hooks'
import {
  resetSingleCompanyReducer,
  setCompaniesEmployees,
  setCompanyId,
  setFullSiteData,
  setParentCompanies,
  setSingleCompany,
  setSiteId,
}                                        from '../auth/SingleCompanyReducer/SingleCompanyReducer'
import {
  CompaniesType,
  EmployeesType,
  FullSiteData,
}                                        from '../types/globalTypes'


const useFetchSingleCompany = () => {
  const [cookies]                             = useCookies(['access_token'])
  const [searchParams]                        = useSearchParams()
  const siteId                                = searchParams.get('siteId')
  const { id }                                = useParams()
  const dispatch                              = useAppDispatch()
  const openEmployeeAdditionModal             = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  const setSubClientAdded                     = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const openClientsEmployeesDrawer            = useAppSelector((state) => state.modals.openClientsEmployeesDrawer)
  const editCompanyPage = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  React.useEffect(() => {
    const fetchData = async() => {
      const singleCompany: CompaniesType      = await get(`company/company?id=${id}`, cookies.access_token)
      const companyEmployees: EmployeesType[] = await get(`company/CompanyEmployee?companyId=${id}&limit=10&page=1`, cookies.access_token)
      const fullSiteData: FullSiteData[]      = await get('site/fullSiteData', cookies.access_token)
      const allCompanies: CompaniesType[]     = await get('company/company', cookies.access_token)

      dispatch(setFullSiteData(fullSiteData))
      dispatch(setSingleCompany(singleCompany))
      dispatch(setCompanyId(id))
      dispatch(setSiteId(siteId))
      dispatch(setCompaniesEmployees(companyEmployees))

      const parentCompanies                   = allCompanies.filter((el: CompaniesType) => el._id !== id && !el.parentId)
      dispatch(setParentCompanies(parentCompanies))
    }

    fetchData()
    return () => {
      dispatch(resetSingleCompanyReducer())
    }
  },[siteId, cookies.access_token, dispatch, openEmployeeAdditionModal, setSubClientAdded, openClientsEmployeesDrawer, editCompanyPage])

}

export default useFetchSingleCompany