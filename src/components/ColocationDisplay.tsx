import { Divider } from 'antd'
import React from 'react'
import { ColocationDataType } from '../types/globalTypes'

type ColocationViewProps = {
    locationName:string
    locationData: ColocationDataType[] | undefined
}
const ColocationDisplay = ({locationName, locationData}:ColocationViewProps) => {
  return (
    <div style={{width: '45%'}}>
      {locationData && <Divider>{locationName}</Divider>}
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}} >
        {locationData?.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, values]) => (
              <div key={key}>
                <strong>{key}</strong>
                {values.map((value, valueIndex) => (
                  <div key={valueIndex}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColocationDisplay