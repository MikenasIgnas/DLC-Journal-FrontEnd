/* eslint-disable max-len */
import React               from 'react'
import { useCookies }      from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { get }             from './helpers'
import { UserType }        from '../types/globalTypes'

const useSetAllUsersData = (isDisabled?: boolean) => {
  const [users, setUsers]   = React.useState<UserType[]>()
  const [count, setCount]   = React.useState<number>()
  const [cookies]           = useCookies(['access_token'])
  const [searchParams]      = useSearchParams()
  const tableSorter         = searchParams.get('tableSorter')

  React.useEffect(() => {
    const setFetchedData = async () => {
      const page              = searchParams.get('page') || 1
      const limit             = searchParams.get('limit') || 10
      const searchFilter      = searchParams.get('search')
      const isAdminFilter     = searchParams.get('isAdmin')
      const isDisabledFilter  = searchParams.get('isDisabled')

      let fetchUrl        = `user?page=${page}&limit=${limit}`

      if(isDisabled !== undefined){
        fetchUrl += `&isDisabled=${isDisabled}`
      }

      if (searchFilter) {
        fetchUrl += `&search=${searchFilter}`
      }

      if(isAdminFilter){
        fetchUrl += `&isAdmin=${isAdminFilter}`
      }

      if(isDisabledFilter){
        fetchUrl += `&isDisabled=${isDisabledFilter}`
      }

      if(tableSorter){
        fetchUrl += `&tableSorter=${tableSorter}`
      }

      try {
        const data = await get(fetchUrl, cookies.access_token)
        setUsers(data)
        if(isDisabled !== undefined){
          const filterData = data.filter((el:UserType) => el.isDisabled !== true)
          setUsers(filterData)
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    setFetchedData()
  }, [cookies.access_token, searchParams])
  React.useEffect(() => {
    (async () => {
      let fetchUrl = 'user/count'
      if(isDisabled !== undefined) {
        fetchUrl += `?isDisabled=${isDisabled}`
      }
      const documents = await get(fetchUrl, cookies.access_token)
      setCount(documents)
    })()
  }, [])

  return {users, setUsers, count, setCount}
}

export default useSetAllUsersData