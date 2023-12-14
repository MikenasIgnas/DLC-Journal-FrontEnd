/* eslint-disable max-len */
import React            from 'react'
import { Button }       from 'antd'
import { get }          from '../../../Plugins/helpers'
import { useCookies }   from 'react-cookie'
import { VisitsType }   from '../../../types/globalTypes'
import { useParams }    from 'react-router'

type VisitStatusButtonProps = {
    fetchData:          () => void;
    buttonText:         string;
    url:                string
    setVisitData:       React.Dispatch<React.SetStateAction<VisitsType[] | undefined>>
}

const VisitStatusButton = ({ fetchData, buttonText, url, setVisitData}: VisitStatusButtonProps) => {
  const [cookies]   = useCookies(['access_token'])
  const {id}        = useParams()
  const changeVisitsState = async (url: string) => {
    try {
      const res = await get(`${url}?visitId=${id}`, cookies.access_token)
      setVisitData(res.data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Button onClick={async () => { await changeVisitsState(url); fetchData() }}>{buttonText}</Button>
  )
}

export default VisitStatusButton