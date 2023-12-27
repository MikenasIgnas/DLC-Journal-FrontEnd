import React               from 'react'
import { useCookies }      from 'react-cookie'
import { get }             from './helpers'

interface Role {
    name:       string
    isDisabled: boolean;
    _id:        string;
}

const useSetRole = (id: string) => {
  const [data, setData]   = React.useState<Role>()
  const [cookies]         = useCookies(['access_token'])

  React.useEffect(() => {
    const setFetchedData = async () => {
      try {
        const res = await get(`role/getRole?roleId=${id}`, cookies.access_token)
        setData(res)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    setFetchedData()
  }, [cookies.access_token])


  return {data}
}

export default useSetRole