/* eslint-disable max-len */
import React               from 'react'
import { useCookies }      from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { get }             from './helpers'
import { UserType }        from '../types/globalTypes'

const useSetAllUsersData = (isDisabled?: boolean) => {
  const [users, setUsers] = React.useState<UserType[]>()
  const [count, setCount] = React.useState<number>()
  const [cookies]         = useCookies(['access_token'])
  const [searchParams]    = useSearchParams()
  const tableSorter       = searchParams.get('tableSorter')
  const page              = searchParams.get('page') || 1
  const limit             = searchParams.get('limit') || 10
  const searchFilter      = searchParams.get('search')
  const isAdminFilter     = searchParams.get('isAdmin')
  const isSecurityFilter  = searchParams.get('isSecurity')
  const isDisabledFilter  = searchParams.get('isDisabled')

  React.useEffect(() => {
    const setFetchedData = async () => {
      let fetchUrl        = `user?page=${page}&limit=${limit}`
      let fetchCountUrl   = `user/count?isDisabled=${isDisabled}`

      if(isDisabled !== undefined){
        fetchUrl += `&isDisabled=${isDisabled}`
        fetchCountUrl += `&isDisabled=${isDisabled}`
      }

      if (searchFilter) {
        fetchUrl += `&search=${searchFilter}`
        fetchCountUrl += `&search=${searchFilter}`
      }

      if(isAdminFilter){
        fetchUrl += `&isAdmin=${isAdminFilter}`
        fetchCountUrl += `&isAdmin=${isAdminFilter}`
      }

      if(isDisabledFilter){
        fetchUrl += `&isDisabled=${isDisabledFilter}`
        fetchCountUrl += `&isDisabled=${isDisabledFilter}`
      }

      if(tableSorter){
        fetchUrl += `&tableSorter=${tableSorter}`
        fetchCountUrl += `&tableSorter=${tableSorter}`
      }

      if(isSecurityFilter){
        fetchUrl += `&isSecurity=${isSecurityFilter}`
        fetchCountUrl += `&isSecurity=${isSecurityFilter}`
      }

      try {
        const data = await get(fetchUrl, cookies.access_token)
        const documents = await get(fetchCountUrl, cookies.access_token)
        setUsers(data)
        setCount(documents)
        if(isDisabled !== undefined){
          const filterData = data.filter((el:UserType) => el.isDisabled !== true)
          setUsers(filterData)
        }

      } catch (error) {
        if(error instanceof Error){
          alert(error.message)
        }
      }
    }

    setFetchedData()
  }, [cookies.access_token, searchParams])

  // React.useEffect(() => {
  //   (async () => {
  //     try{

  //       let fetchUrl = `user/count?isDisabled=${isDisabled}`

  //       if (searchFilter) {
  //         fetchUrl += `&search=${searchFilter}`
  //       }

  //       if(isAdminFilter){
  //         fetchUrl += `&isAdmin=${isAdminFilter}`
  //       }

  //       if(isDisabledFilter){
  //         fetchUrl += `&isDisabled=${isDisabledFilter}`
  //       }

  //       if(tableSorter){
  //         fetchUrl += `&tableSorter=${tableSorter}`
  //       }

  //       if(isSecurityFilter){
  //         fetchUrl += `&isSecurity=${isSecurityFilter}`
  //       }

  //       const documents = await get(fetchUrl, cookies.access_token)
  //       setCount(documents)
  //     }catch(error){
  //       if(error instanceof Error){
  //         alert(error.message)
  //       }
  //     }
  //   })()
  // }, [cookies.access_token, searchParams])

  return {users, setUsers, count, setCount}
}

export default useSetAllUsersData