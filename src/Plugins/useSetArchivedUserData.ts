import React                from 'react'
import { useCookies }       from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get }              from './helpers'
import { UserType }         from '../types/globalTypes'

const useSetArchivedUserData = () => {
  const [data, setData]   = React.useState<UserType[]>()
  const [count, setCount] = React.useState<number>()
  const [cookies]         = useCookies(['access_token'])
  const [searchParams]    = useSearchParams()
  const tableSorter       = searchParams.get('tableSorter')

  React.useEffect(() => {
    const setFetchedData = async () => {
      const page          = searchParams.get('page') || 1
      const limit         = searchParams.get('limit') || 10
      const selectFilter  = searchParams.get('selectFilter')
      const searchFilter  = searchParams.get('filter')

      let fetchUrl = `getArchivedUsers?page=${page}&limit=${limit}`

      if (searchFilter) {
        fetchUrl += `&filter=${searchFilter}`
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
      const documents = await get('archivedUsersCount', cookies.access_token)
      setCount(documents.data)
    })()
  }, [])
  return {data, count, setCount}
}

export default useSetArchivedUserData