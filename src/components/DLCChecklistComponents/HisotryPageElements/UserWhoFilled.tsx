/* eslint-disable max-len */
import React                    from 'react'
import { RouteType, TokenType } from '../../../types/globalTypes'
import { Card }                 from 'antd'
import { Link }                 from 'react-router-dom'
import { useAppSelector }       from '../../../store/hooks'
import { useCookies }           from 'react-cookie'
import {jwtDecode}              from 'jwt-decode'
import { calculateTimeDifference } from '../../../Plugins/helpers'

type UserWhoFilledProps = {
    item: RouteType | undefined,
}

const UserWhoFilled = ({item}:UserWhoFilledProps) => {
  const [differencer, setDifference]  = React.useState<string | undefined>('')
  const problemCount                  = useAppSelector((state)=> state.fetchedData.problemCount)
  const [cookies]                     = useCookies(['access_token'])
  const token                         = cookies.access_token
  const decodedToken:TokenType        = jwtDecode(token)
  const isMobile                      = window.innerWidth < 650

  React.useEffect(() => {
    if(item){
      const timeDifferencer = calculateTimeDifference(item.startDate, item.startTime, item.endDate, item.endTime)
      setDifference(timeDifferencer)
    }
  }, [problemCount])

  return (
    <Card title={
      (item?.userRole === 'admin' || item?.userRole === 'SYSADMIN') || (decodedToken.userRole === 'admin' || decodedToken.userRole === 'SYSADMIN')
        ?
        <Link to={`/SingleUserPage/${item?.id}`}>{item?.userName}</Link>
        : <div>{item?.userName}</div>
    }
    bordered={false}
    style={{ width: isMobile ? '200px' : '300px', marginTop: isMobile ? '15px' : ''}}>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between'}}>
        <p>Pradėta: {item?.startDate}</p>
        <p>{item?.startTime}</p>
      </div>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between'}}>
        <p>Baigta: {item?.endDate}</p>
        <p>{item?.endTime}</p>
      </div>
      <div>
        <p>Užtrukta: {differencer}</p>
        <p>Problemos: {problemCount}</p>
        <p>Rolė: {item?.userRole}</p>
      </div>
    </Card>
  )
}

export default UserWhoFilled