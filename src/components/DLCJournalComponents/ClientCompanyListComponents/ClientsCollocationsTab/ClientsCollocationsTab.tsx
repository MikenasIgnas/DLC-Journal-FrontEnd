/* eslint-disable max-len */
import React                  from 'react'
import ClientsCollocations    from '../ClientsCollocations'
import { CollocationsSites, CollocationsType, ColocationDataType, ModalStateType } from '../../../../types/globalTypes'
import EditableCollocationFormList from '../CollocationFormList'
import { Button } from 'antd'

type ClientsCollocationsProps = {
    J13locationName:    string
    T72locationName:    string
    J13locationData:    ColocationDataType[] | undefined
    T72locationData:    ColocationDataType[] | undefined
    edit:               ModalStateType;
    collocations:       CollocationsType[] | undefined
    collocationsSites:  CollocationsSites
}


const ClientsCollocationsTab = ({J13locationData, J13locationName, T72locationData, T72locationName, edit, collocations, collocationsSites}: ClientsCollocationsProps) => {
  return (
    <>
      {!edit.edit ?
        <ClientsCollocations
          J13locationName={J13locationName}
          J13locationData={J13locationData}
          T72locationName={T72locationName}
          T72locationData={T72locationData}
        />
        :
        <EditableCollocationFormList
          collocations={collocations}
          collocationsSites={collocationsSites}
        />
      }
    </>
  )
}

export default ClientsCollocationsTab