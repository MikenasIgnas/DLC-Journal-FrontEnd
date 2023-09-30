/* eslint-disable max-len */
import React                  from 'react'
import ColocationDisplay      from './ColocationDisplay'
import { ColocationDataType } from '../../../types/globalTypes'

type ClientsCollocationsProps = {
    J13locationName:string
    T72locationName:string
    J13locationData: ColocationDataType[] | undefined
    T72locationData: ColocationDataType[] | undefined
}

const ClientsCollocations = ({J13locationData, J13locationName, T72locationData, T72locationName}:ClientsCollocationsProps) => {
  return(
    <div style={{display: 'flex', justifyContent: J13locationData && J13locationData?.length >= 1 && T72locationData && T72locationData?.length >= 1 ? 'space-between': 'center'}}>
      {J13locationData && J13locationData?.length >= 1 ? <ColocationDisplay locationName={J13locationName} locationData={J13locationData}/> : null}
      {T72locationData && T72locationData?.length >= 1 ? <ColocationDisplay locationName={T72locationName} locationData={T72locationData}/> : null}
    </div>
  )
}

export default ClientsCollocations