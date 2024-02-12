/* eslint-disable max-len */
import React                              from 'react'
import { get }                            from './helpers'
import { useCookies }                     from 'react-cookie'
import { CompaniesType, Premises, Racks } from '../types/globalTypes'
import { useSearchParams }                from 'react-router-dom'
import { useAppDispatch }                 from '../store/hooks'
import { setCompanyRacks, setPermise }    from '../auth/RacksReducer/RacksReducer'

const useFetchCompanyRacks = () => {
  const [cookies]       = useCookies(['access_token'])
  const [searchParams]  = useSearchParams()
  const companyId       = searchParams.get('companyId')
  const addressId       = searchParams.get('addressId')
  const dispatch        = useAppDispatch()

  React.useEffect(() => {
    const fetchData = async() => {
      const singleCompany: CompaniesType  = await get(`company/company?id=${companyId}`, cookies.access_token)
      const racksRes: Racks[]             = await get('site/rack', cookies.access_token)
      const premiseRes: Premises[]        = await get('site/premise', cookies.access_token)
      const siteByPremise                 = premiseRes.filter((el) => el.siteId === addressId)
      const premiseIds                    = siteByPremise.map((el) => el._id)
      const companyRacks                  = racksRes.filter(item => item._id && singleCompany?.racks?.includes(item._id) && premiseIds.includes(item.premiseId))
      const racksPremiseIds               = companyRacks.map((el) => el.premiseId)
      const premise                       = siteByPremise.filter((el) => racksPremiseIds.includes(el._id))

      dispatch(setCompanyRacks(companyRacks))
      dispatch(setPermise(premise))
    }

    fetchData()
  },[addressId, companyId, cookies.access_token, dispatch])

}

export default useFetchCompanyRacks