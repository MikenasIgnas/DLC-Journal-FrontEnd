import React               from 'react'
import { useCookies }      from 'react-cookie'
import { get }             from './helpers'

interface Role {
    name:       string
    isDisabled: boolean;
    _id:        string;
}

const useSetUserRoles = () => {
  const [data, setData]   = React.useState<Role[]>()
  const [cookies]         = useCookies(['access_token'])

  React.useEffect(() => {
    const setFetchedData = async () => {
      try {
        const data = await get('role/getAll', cookies.access_token)
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    setFetchedData()
  }, [cookies.access_token])


  return {data}
}

export default useSetUserRoles