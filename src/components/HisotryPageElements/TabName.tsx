/* eslint-disable max-len */
import React              from 'react'
import { Badge }          from 'antd'
import { useAppSelector } from '../../store/hooks'

type TabNameProps = {
    itemId: string | number
}

const TabName = ({itemId}:TabNameProps) => {
  const filledData =        useAppSelector((state)=> state.fetchedData.FilledData)
  const filteredByRoute =   filledData?.filter((el) => el.routeNumber === itemId)
  let routeProblemCount =   0

  filteredByRoute?.forEach(obj => {
    const values =        Object.values(obj.values)
    const nestedObjects = values.flatMap(arr => arr)
    const trueValues =    nestedObjects.filter(nestedObj => Object.values(nestedObj)[0] === true)
    routeProblemCount += trueValues.length
  })

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {
        routeProblemCount > 0
          ?
          <Badge size='small' count={routeProblemCount}>
            <div style={{marginRight: '10px'}}>Maršrutas {itemId}</div>
          </Badge>
          :
          <div>Maršrutas {itemId}</div>
      }
    </div>
  )
}

export default TabName