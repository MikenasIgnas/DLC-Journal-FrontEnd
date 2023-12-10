/* eslint-disable max-len */
import React                    from 'react'
import { RouteType, TokenType } from '../../../types/globalTypes'
import { Card }                 from 'antd'
import { Link }                 from 'react-router-dom'
import { useAppSelector }       from '../../../store/hooks'
import { useCookies }           from 'react-cookie'
import {jwtDecode}              from 'jwt-decode'

type UserWhoFilledProps = {
    item: RouteType | undefined,
}

const UserWhoFilled = ({item}:UserWhoFilledProps) => {
  const [differencer, setDifference]  = React.useState('')
  const problemCount                  = useAppSelector((state)=> state.fetchedData.problemCount)
  const defaultPageTheme              = useAppSelector((state) => state.theme.value)
  const [cookies]                     = useCookies(['access_token'])
  const token                         = cookies.access_token
  const decodedToken:TokenType        = jwtDecode(token)
  const isMobile                      = window.innerWidth < 650
  React.useEffect(() => {
    if(item){
      const [startHour, startMinute]  = item.startTime.split(':').map(Number)
      const [endHour, endMinute]      = item.endTime.split(':').map(Number)
      const difference                = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
      const differenceString          = `${Math.floor(difference / 60)}:${(difference % 60).toString().padStart(2, '0')}`
      setDifference(differenceString)
    }
  }, [problemCount])

  return (
    <Card title={
      (item?.userRole === 'admin' || item?.userRole === 'SYSADMIN') || (decodedToken.userRole === 'admin' || decodedToken.userRole === 'SYSADMIN')
        ?
        <Link to={`/SingleUserPage/${item?.id}`}>{item?.userName}</Link>
        : <div style={{color: defaultPageTheme ? 'white' : 'black'}}>{item?.userName}</div>
    }
    bordered={false}
    style={{ backgroundColor: defaultPageTheme ? '#191919': '' , width: isMobile ? '200px' : '300px', marginTop: isMobile ? '15px' : ''}}>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between', color: defaultPageTheme ? 'white': 'black'}}>
        <p>Pradėta: {item?.startDate}</p>
        <p>{item?.startTime}</p>
      </div>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between', color: defaultPageTheme ? 'white': 'black'}}>
        <p>Baigta: {item?.endDate}</p>
        <p>{item?.endTime}</p>
      </div>
      <div style={{color: defaultPageTheme ? 'white': 'black'}}>
        <p>Užtrukta: {differencer}</p>
        <p>Problemos: {problemCount}</p>
        <p>Rolė: {item?.userRole}</p>
      </div>
    </Card>
  )
}

export default UserWhoFilled