import React               from 'react'
import { useCookies }      from 'react-cookie'
import { get }             from './helpers'
import { useParams } from 'react-router-dom'

type SingleUserType = {
    name:           string,
    email:          string,
    username:       string,
    isAdmin:        boolean,
    password:       string,
    repeatPassword: string,
    _id:            string
}

const useSetSingleUser = () => {
  const [user, setUser]         = React.useState<SingleUserType>()
  const [loading, setLoading]   = React.useState(false)
  const [cookies]               = useCookies(['access_token'])
  const {id}                    = useParams()

  React.useEffect(() => {
    const setFetchedData = async () => {
      try {
        setLoading(true)
        const data = await get(`user/getbyid?id=${id}`, cookies.access_token)
        setUser(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    setFetchedData()
  }, [id])

  return {user, id, loading}
}

export default useSetSingleUser