import React                from 'react'
import { useCookies }       from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get }              from './helpers'
import { VisitsType }       from '../types/globalTypes'

const useSetVisitsData = () => {
  const [data, setData]       = React.useState<VisitsType[]>()
  const [count, setCount]     = React.useState<number>()
  const [cookies]             = useCookies(['access_token'])
  const [searchParams]        = useSearchParams()
  const [loading, setLoading] = React.useState(false)
  const page                  = searchParams.get('page') || 1
  const limit                 = searchParams.get('limit') || 10
  const selectFilter          = searchParams.get('selectFilter')
  const searchFilter          = searchParams.get('search')
  const tableSorter            = searchParams.get('tableSorter')

  React.useEffect(() => {
    const setFetchedData = async () => {
      let fetchUrl        = `visitsData?page=${page}&limit=${limit}`

      if (searchFilter) {
        fetchUrl += `&search=${searchFilter}`
      }

      if(selectFilter){
        fetchUrl += `&selectFilter=${selectFilter}`
      }

      if(tableSorter){
        fetchUrl += `&tableSorter=${tableSorter}`
      }

      try {
        const data = await get(fetchUrl, cookies.access_token)
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    setFetchedData()
  }, [cookies.access_token, searchParams])

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      const documents = await get('visitsCount', cookies.access_token)
      setCount(documents.data)
      setLoading(false)
    })()
  }, [])
  return {data, count, setData, loading, setCount}
}

export default useSetVisitsData