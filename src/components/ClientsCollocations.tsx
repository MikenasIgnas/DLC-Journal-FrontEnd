/* eslint-disable max-len */
import React                            from 'react'
import ColocationDisplay from './ColocationDisplay'
import { ColocationDataType } from '../types/globalTypes'

type ClientsCollocationsProps = {
    J13locationName:string
    T72locationName:string
    J13locationData: ColocationDataType[] | undefined
    T72locationData: ColocationDataType[] | undefined
}

const ClientsCollocations = ({J13locationData, J13locationName, T72locationData, T72locationName}:ClientsCollocationsProps) => (

  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <ColocationDisplay locationName={J13locationName} locationData={J13locationData}/>
    <ColocationDisplay locationName={T72locationName} locationData={T72locationData}/>
  </div>
)

export default ClientsCollocations