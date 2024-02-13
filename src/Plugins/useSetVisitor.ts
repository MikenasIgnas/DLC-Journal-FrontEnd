/* eslint-disable max-len */
import React                          from 'react'
import { get }                        from './helpers'
import { useCookies }                 from 'react-cookie'
import { useSearchParams }            from 'react-router-dom'
import { CompaniesType, VisitStatus } from '../types/globalTypes'
import { useAppDispatch }             from '../store/hooks'
import { setPermissions }             from '../auth/VisitorsPermissionsReducer/VisitorsPermissionsReduces'

const useSetVisitor = () => {
  const [cookies]                       = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const companyId                       = searchParams.get('companyId')
  const addressId                       = searchParams.get('addressId')
  const [allCompanies, setAllCompanies] = React.useState<CompaniesType[]>()
  const [visitStatus, setVisitStatus]   = React.useState<VisitStatus[]>([])
  const dispatch                        = useAppDispatch()

  React.useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      const companies                       = await get('company/company', cookies.access_token)
      const permissionsRes                  = await get('company/permission', cookies.access_token)
      const visitStatusRes: VisitStatus[]   = await get('visit/visitStatus', cookies.access_token)
      if (isMounted) {
        setAllCompanies(companies)
        dispatch(setPermissions(permissionsRes))

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
    value: el._id,
    label: el.name,
  }))

  return {
    companyNames,
    setSearchParams,
    searchParams,
    addressId,
    visitStatus,
  }
}

export default useSetVisitor