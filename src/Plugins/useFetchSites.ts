/* eslint-disable max-len */
import React                 from 'react'
import { get }               from './helpers'
import { useCookies }        from 'react-cookie'
import { FullSiteData }      from '../types/globalTypes'
import { useSearchParams }   from 'react-router-dom'
import { useAppDispatch }    from '../store/hooks'
import { resetRacksReducer } from '../auth/RacksReducer/RacksReducer'

import {
  resetFullSiteData,
  setFullSiteData,
}                            from '../auth/SitesReducer/SitesReducer'

const useFetchSites = () => {
  const [cookies]       = useCookies(['access_token'])
  const [searchParams]  = useSearchParams()
  const companyId       = searchParams.get('companyId')
  const siteId          = searchParams.get('siteId')
  const dispatch        = useAppDispatch()

  React.useEffect(() => {
    const fetchData = async() => {
      const fullSiteData: FullSiteData[]  = await get('site/fullSiteData', cookies.access_token)
      dispatch(setFullSiteData(fullSiteData))
    }

    fetchData()
    return () => {
      dispatch(resetFullSiteData())
      dispatch(resetRacksReducer())
    }
  },[siteId, companyId, cookies.access_token, dispatch])

}

export default useFetchSites