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
  setCompanyDocuments,
  setCompanyEmployeesCount,
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
  CompanyDocuments,
}                             from '../types/globalTypes'
import { resetRacksReducer }  from '../auth/RacksReducer/RacksReducer'
import { message }            from 'antd'

const useFetchSingleCompany = () => {
  const [cookies]                    = useCookies(['access_token'])
  const [searchParams]               = useSearchParams()
  const siteId                       = searchParams.get('siteId')
  const { id }                       = useParams()
  const dispatch                     = useAppDispatch()
  const openEmployeeAdditionModal    = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  const setSubClientAdded            = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const editCompanyPage              = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const editClientsEmployee          = useAppSelector((state) => state.singleCompanyEdits.editClientsEmployee)
  const [messageApi, contextHolder]  = message.useMessage()
  const page                         = searchParams.get('page') || 1
  const limit                        = searchParams.get('limit') || 10
  const search                       = searchParams.get('search')

  React.useEffect(() => {
    dispatch(setLoading(true))
    try{
      const fetchData = async() => {
        const singleCompany: CompaniesType          = await get(`company/company?id=${id}`, cookies.access_token)
        const fullSiteData: FullSiteData[]          = await get('site/fullSiteData', cookies.access_token)
        const allCompanies: CompaniesType[]         = await get('company/company', cookies.access_token)
        const companyDocuments: CompanyDocuments[]  = await get(`company/document?companyId=${singleCompany._id}`, cookies.access_token)

        dispatch(setFullSiteData(fullSiteData))
        dispatch(setCompanyDocuments(companyDocuments))
        dispatch(setSingleCompany(singleCompany))
        dispatch(setCompanyId(id))
        dispatch(setSiteId(siteId))
        const parentCompanies                         = allCompanies.filter((el: CompaniesType) => el._id !== id && !el.parentId)
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


  React.useEffect(() => {
    const fetchData = async() => {

      let fetchCompnayEmployeesUrl                = `company/CompanyEmployee?companyId=${id}&page=${page}&limit=${limit}`
      let fetchCompanyEmployeeCountUrl            = `company/CompanyEmployee/count?companyId=${id}`
      if(search){
        fetchCompnayEmployeesUrl += `&search=${search}`
        fetchCompanyEmployeeCountUrl += `&search=${search}`
      }
      const companyEmployees: EmployeesType[]     = await get(fetchCompnayEmployeesUrl, cookies.access_token)
      const companyEmployeesCount: number         = await get(fetchCompanyEmployeeCountUrl, cookies.access_token)
      dispatch(setCompaniesEmployees(companyEmployees))
      dispatch(setCompanyEmployeesCount(companyEmployeesCount))
    }

    fetchData()
  },[page, search, limit])
  return {contextHolder}
}

export default useFetchSingleCompany