/* eslint-disable max-len */
import React               from 'react'
import { get }             from './helpers'
import { useCookies }      from 'react-cookie'
import {
  FullSiteData,
}                  from '../types/globalTypes'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch }  from '../store/hooks'
import {
  resetFullSiteData,
  setFullSiteData,
}                          from '../auth/SitesReducer/SitesReducer'

const useFetchSites = () => {
  const [cookies]       = useCookies(['access_token'])
  const [searchParams]  = useSearchParams()
  const companyId       = searchParams.get('companyId')
  const addressId       = searchParams.get('addressId')
  const dispatch        = useAppDispatch()

  React.useEffect(() => {
    const fetchData = async() => {
      const fullSiteData: FullSiteData[]  = await get('site/fullSiteData', cookies.access_token)
      dispatch(setFullSiteData(fullSiteData))
    }

    fetchData()
    return () => {
      dispatch(resetFullSiteData())
    }
  },[addressId, companyId, cookies.access_token, dispatch])

}

export default useFetchSites