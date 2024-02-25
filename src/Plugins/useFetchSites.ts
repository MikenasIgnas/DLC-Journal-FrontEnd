/* eslint-disable max-len */
import React                  from 'react'
import { get }                from './helpers'
import { useCookies }         from 'react-cookie'
import { FullSiteData }       from '../types/globalTypes'
import { useSearchParams }    from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
}                             from '../store/hooks'

import {
  setFullSiteData,
}                             from '../auth/SitesReducer/SitesReducer'

const useFetchSites = () => {
  const [cookies]                   = useCookies(['access_token'])
  const [searchParams]              = useSearchParams()
  const companyId                   = searchParams.get('companyId')
  const siteId                      = searchParams.get('siteId')
  const dispatch                    = useAppDispatch()
  const openCompaniesAdditionModal  = useAppSelector((state) => state.modals.openCompaniesAdditionModal)

  React.useEffect(() => {
    try{

      const fetchData = async() => {
        const fullSiteData: FullSiteData[]  = await get('site/fullSiteData', cookies.access_token)
        dispatch(setFullSiteData(fullSiteData))
      }

      fetchData()
    }catch(error){
      if(error instanceof Error){
        alert(error.message)
      }
    }
  },[siteId, companyId, cookies.access_token, dispatch, openCompaniesAdditionModal])

}

export default useFetchSites