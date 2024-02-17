/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                        from 'react'
import { RouteType }                from '../../../types/globalTypes'
import { Card }                     from 'antd'
import { Link }                     from 'react-router-dom'
import { useAppSelector }           from '../../../store/hooks'
import { calculateTimeDifference, convertUTCtoLocalDate }  from '../../../Plugins/helpers'

type UserWhoFilledProps = {
    item: RouteType | undefined,
}

const UserWhoFilled = ({item}:UserWhoFilledProps) => {
  const [differencer, setDifference]  = React.useState<string | undefined>('')
  const problemCount                  = useAppSelector((state)=> state.fetchedData.problemCount)
  const isMobile                      = window.innerWidth < 650

  React.useEffect(() => {
    if(item){
      const timeDifferencer = calculateTimeDifference(item.startDate, item.endDate)
      setDifference(timeDifferencer)
    }
  }, [problemCount])

  return (
    <Card title={ <Link to={`/SingleUserPage/${item?.id}`}>{item?.userName}</Link>}
      bordered={false}
      style={{ width: isMobile ? '200px' : '300px', marginTop: isMobile ? '15px' : ''}}>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between'}}>
        <p>Pradėta: {convertUTCtoLocalDate(item?.startDate)}</p>
        <p>{item?.startTime}</p>
      </div>
      <div style={{display: 'flex', width: '160px', justifyContent: 'space-between'}}>
        <p>Baigta: {convertUTCtoLocalDate(item?.endDate)}</p>
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