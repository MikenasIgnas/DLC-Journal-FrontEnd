/* eslint-disable max-len */
import React                  from 'react'
import { get }                from './helpers'
import { useCookies }         from 'react-cookie'
import {
  useParams,
  useSearchParams,
}                             from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
}                             from '../store/hooks'
import {
  resetSingleCompanyReducer,
  setCompaniesEmployees,
  setCompanyId,
  setFullSiteData,
  setLoading,
  setParentCompanies,
  setSingleCompany,
  setSiteId,
}                             from '../auth/SingleCompanyReducer/SingleCompanyReducer'
import {
  CompaniesType,
  EmployeesType,
  FullSiteData,
}                             from '../types/globalTypes'
import { resetRacksReducer }  from '../auth/RacksReducer/RacksReducer'
import { message }            from 'antd'

const useFetchSingleCompany = () => {
  const [cookies]                             = useCookies(['access_token'])
  const [searchParams]                        = useSearchParams()
  const siteId                                = searchParams.get('siteId')
  const { id }                                = useParams()
  const dispatch                              = useAppDispatch()
  const openEmployeeAdditionModal             = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  const setSubClientAdded                     = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const editCompanyPage                       = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const editClientsEmployee                   = useAppSelector((state) => state.singleCompanyEdits.editClientsEmployee)
  const [messageApi, contextHolder]           = message.useMessage()

  React.useEffect(() => {
    dispatch(setLoading(true))
    try{

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
        dispatch(setLoading(false))
      }

      fetchData()
      return () => {
        dispatch(resetSingleCompanyReducer())
        dispatch(resetRacksReducer())
      }
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  },[cookies.access_token, dispatch, openEmployeeAdditionModal, setSubClientAdded, editCompanyPage, editClientsEmployee])

  return {contextHolder}
}

export default useFetchSingleCompany