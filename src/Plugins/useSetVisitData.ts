import React                from 'react'
import { useCookies }       from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get }              from './helpers'
import { VisitsType }       from '../types/globalTypes'
import { message } from 'antd'

const useSetVisitsData = () => {
  const [data, setData]             = React.useState<VisitsType[]>()
  const [count, setCount]           = React.useState<number>()
  const [cookies]                   = useCookies(['access_token'])
  const [searchParams]              = useSearchParams()
  const [loading, setLoading]       = React.useState(false)
  const page                        = searchParams.get('page') || 1
  const limit                       = searchParams.get('limit') || 10
  const selectFilter                = searchParams.get('selectFilter')
  const searchFilter                = searchParams.get('search')
  const tableOrder                  = searchParams.get('descending')
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    const setFetchedData = async () => {
      let fetchUrl        = `visit/visit?page=${page}&limit=${limit}`

      if (searchFilter) {
        fetchUrl += `&search=${searchFilter}`
      }

      if(selectFilter){
        fetchUrl += `&selectFilter=${selectFilter}`
      }

      if(tableOrder){
        fetchUrl += `&descending=${tableOrder}`
      }

      try {
        const data = await get(fetchUrl, cookies.access_token)
        setData(data)
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
        setLoading(true)
        const documentsCount = await get('visit/visit/count', cookies.access_token)
        setCount(documentsCount)
        setLoading(false)
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
  return {data, count, setData, loading, setCount, contextHolder}
}

export default useSetVisitsData