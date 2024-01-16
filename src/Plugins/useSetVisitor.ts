/* eslint-disable max-len */
import React from 'react'
import { get }              from './helpers'
import { useCookies }       from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { CollocationType, CompaniesType } from '../types/globalTypes'

const useSetVisitor = () => {
  const [cookies]                                         = useCookies(['access_token'])
  const [searchParams, setSearchParams]                   = useSearchParams()
  const companyId                                         = searchParams.get('companyId')
  const addressId                                         = searchParams.get('addressId')
  const [companiesColocations, setCompaniesCollocations]  = React.useState<CollocationType[]>()
  const [allCompanies, setAllCompanies]                   = React.useState<CompaniesType[]>()
  const [selectedVisitors, setSelectedVisitors]           = React.useState<number[]>([])

  React.useEffect(() => {
    (async () => {
      const companies     = await get('getCompanies', cookies.access_token)
      const singleCompany = await get(`getSingleCompany?companyId=${companyId}`, cookies.access_token)
      localStorage.removeItem('visitPurpose')
      if(addressId === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      setAllCompanies(companies.data)
    })()
  }, [companyId, addressId, selectedVisitors, selectedVisitors?.length])

  const companyNames = allCompanies?.map((el)=> {
    return { ...el, value: el.companyInfo.companyName, label: el.companyInfo.companyName}
  })

  return {
    companyNames,
    companiesColocations,
    setSearchParams,
    setSelectedVisitors,
    searchParams,
    selectedVisitors,
    addressId,
  }
}

export default useSetVisitor