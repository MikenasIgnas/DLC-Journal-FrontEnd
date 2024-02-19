/* eslint-disable max-len */
import React               from 'react'
import { useCookies }      from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { get }             from './helpers'
import { UserType }        from '../types/globalTypes'
import { message }         from 'antd'

const useSetUsersData = (isDisabled?: boolean) => {
  const [users, setUsers]           = React.useState<UserType[]>()
  const [count, setCount]           = React.useState<number>()
  const [cookies]                   = useCookies(['access_token'])
  const [searchParams]              = useSearchParams()
  const tableSorter                 = searchParams.get('tableSorter')
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    const setFetchedData = async () => {
      const page          = searchParams.get('page') || 1
      const limit         = searchParams.get('limit') || 10
      const searchFilter  = searchParams.get('filter')
      const selectFilter  = searchParams.get('selectFilter')
      let fetchUrl        = `user?page=${page}&limit=${limit}`


      if(isDisabled !== undefined){
        fetchUrl += `&isDisabled${isDisabled}`
      }

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
        setUsers(data)
        if(isDisabled !== undefined){
          const filterData = data.filter((el:UserType) => el.isDisabled !== true)
          setUsers(filterData)
        }

      } catch (error) {
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }

    setFetchedData()
  }, [cookies.access_token, searchParams])

  React.useEffect(() => {
    (async () => {
      try{
        let fetchUrl = 'user/count'
        if(isDisabled !== undefined) {
          fetchUrl += `?isDisabled=${isDisabled}`
        }
        const documents = await get(fetchUrl, cookies.access_token)
        setCount(documents)
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  }, [])

  return {users, setUsers, count, setCount, contextHolder}
}

export default useSetUsersData