import { useState }   from 'react'
import { get }        from '../Plugins/helpers'
import React          from 'react'
import { useCookies } from 'react-cookie'

export const useFetch = <T>(url: string) => {
  const [cookies]       = useCookies(['access_token'])
  const [data, setData] = useState<T | undefined>()

  React.useEffect(() => {
    (async () => {
      try{
        const response = await get(url, cookies.access_token)
        setData(response)
      }catch(error){
        if(error instanceof Error){
          alert(error)
        }
      }
    })()
  }, [url])

  return data
}

export default useFetch