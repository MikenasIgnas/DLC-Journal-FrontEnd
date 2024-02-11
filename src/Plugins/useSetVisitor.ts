/* eslint-disable max-len */
import React from 'react'
import { get } from './helpers'
import { useCookies } from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { CompaniesType, Permissions, Premises, Racks, Sites, VisitStatus } from '../types/globalTypes'

const useSetVisitor = () => {
  const [cookies]                               = useCookies(['access_token'])
  const [searchParams, setSearchParams]         = useSearchParams()
  const companyId                               = searchParams.get('companyId')
  const addressId                               = searchParams.get('addressId')
  const [allCompanies, setAllCompanies]         = React.useState<CompaniesType[]>()
  const [selectedVisitors, setSelectedVisitors] = React.useState<string[] | undefined>([])
  const [sites, setSites]                       = React.useState<Sites[]>([])
  const [permissions, setPermissions]           = React.useState<Permissions[]>([])
  const [companyPremise, setCompanyPremise]     = React.useState<Premises[]>([])
  const [companyRacks, setCompanyRacks]         = React.useState<Racks[]>([])
  const [visitStatus, setVisitStatus]           = React.useState<VisitStatus[]>([])

  React.useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      const companies                       = await get('company/company', cookies.access_token)
      const singleCompany                   = await get(`company/company?id=${companyId}`, cookies.access_token)
      const sitesRes: Sites[]               = await get('site/site', cookies.access_token)
      const premiseRes: Premises[]          = await get('site/premise', cookies.access_token)
      const racksRes: Racks[]               = await get('site/rack', cookies.access_token)
      const permissionsRes                  = await get('company/permission', cookies.access_token)
      const visitStatusRes: VisitStatus[]   = await get('visit/visitStatus', cookies.access_token)
      const siteByPrmise                    = premiseRes.filter((el) => el.siteId === addressId)
      const premiseIds                      = siteByPrmise.map((el) => el._id)

      const racksos                         = racksRes.filter(item => singleCompany?.racks?.includes(item._id))
      const racas                           = racksos.filter((el) => premiseIds.includes(el.premiseId))
      const racksPremiseIds                 = racas.map((el) => el.premiseId)
      const premise                         = siteByPrmise.filter((el) => racksPremiseIds.includes(el._id))

      if (isMounted) {
        setCompanyPremise(premise)
        setCompanyRacks(racas)
        setAllCompanies(companies)
        setSites(sitesRes)
        setPermissions(permissionsRes)
        setVisitStatus(visitStatusRes)
        localStorage.removeItem('visitPurpose')
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [companyId, addressId, cookies.access_token])

  const companyNames = allCompanies?.map((el) => ({
    ...el,
    value: el.name,
    label: el.name,
  }))

  return {
    companyNames,
    setSearchParams,
    setSelectedVisitors,
    searchParams,
    selectedVisitors,
    addressId,
    sites,
    permissions,
    companyPremise,
    companyRacks,
    visitStatus,
  }
}

export default useSetVisitor