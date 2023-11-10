/* eslint-disable max-len */
/* eslint-disable prefer-spread */
import { useState } from 'react'
import { get } from '../Plugins/helpers'
import React from 'react'
import { useCookies } from 'react-cookie'

export const useFetch = <T>(url: string, setLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [cookies] =       useCookies(['access_token'])
  const [data, setData] = useState<T | undefined>()
  React.useEffect(() => {
    (async () => {
      try{
        if(setLoading){
          setLoading(true)
          const response = await get(url, cookies.access_token)
          setData(response.data)
          setLoading(false)
        }else{
          const response = await get(url, cookies.access_token)
          setData(response.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [url])

  return data
}

export default useFetch