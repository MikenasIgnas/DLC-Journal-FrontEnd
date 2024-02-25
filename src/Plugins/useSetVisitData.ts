import React                from 'react'
import { useCookies }       from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get }              from './helpers'
import { Sites, VisitStatus, VisitsType }       from '../types/globalTypes'

const useSetVisitsData = () => {
  const [data, setData]             = React.useState<VisitsType[]>()
  const [sites, setSites]             = React.useState<Sites[]>([])
  const [visitStatus, setVisitStatus]             = React.useState<VisitStatus[]>([])
  const [count, setCount]           = React.useState<number>()
  const [cookies]                   = useCookies(['access_token'])
  const [searchParams]              = useSearchParams()
  const [loading, setLoading]       = React.useState(false)
  const page                        = searchParams.get('page') || 1
  const limit                       = searchParams.get('limit') || 10
  const siteId                      = searchParams.get('siteId')
  const statusId                    = searchParams.get('statusId')
  const searchFilter                = searchParams.get('search')
  const tableOrder                  = searchParams.get('descending')

  React.useEffect(() => {
    const setFetchedData = async () => {
      let fetchUrl        = `visit/visit?page=${page}&limit=${limit}`
      let fethCountUrl = `visit/visit/count?page=${page}&limit=${limit}`

      if (searchFilter) {
        fetchUrl += `&search=${searchFilter}`
        fethCountUrl += `&search=${searchFilter}`
      }

      if(siteId){
        fetchUrl += `&siteId=${siteId}`
        fethCountUrl += `&siteId=${siteId}`
      }
      if(statusId){
        fetchUrl += `&statusId=${statusId}`
        fethCountUrl += `&statusId=${statusId}`
      }

      if(tableOrder){
        fetchUrl += `&descending=${tableOrder}`
        fethCountUrl += `&descending=${tableOrder}`
      }

      try {
        setLoading(true)
        const data = await get(fetchUrl, cookies.access_token)
        const sitesData = await get('site/site', cookies.access_token)
        const visitStatusData = await get('visit/visitStatus', cookies.access_token)
        const documentsCount = await get(fethCountUrl, cookies.access_token)
        setCount(documentsCount)
        setData(data)
        setSites(sitesData)
        setVisitStatus(visitStatusData)
        setLoading(false)
      } catch (error) {
        if(error instanceof Error){
          alert(error.message)
        }
      }
    }

    setFetchedData()
  }, [cookies.access_token, searchParams])

  return { data, count, setData, loading, setCount, sites, visitStatus }
}

export default useSetVisitsData