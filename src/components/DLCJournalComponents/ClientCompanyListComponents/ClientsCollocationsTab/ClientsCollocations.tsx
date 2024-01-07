/* eslint-disable max-len */
import React                  from 'react'
import ColocationDisplay      from './ColocationDisplay'
import { ColocationDataType } from '../../../../types/globalTypes'
import { Empty, Tabs, TabsProps } from 'antd'

type ClientsCollocationsProps = {
    J13locationName:  string | undefined
    T72locationName:  string | undefined
    J13locationData:  ColocationDataType[] | undefined
    T72locationData:  ColocationDataType[] | undefined
}

const ClientsCollocations = ({J13locationData, J13locationName, T72locationData, T72locationName}:ClientsCollocationsProps) => {

  const items: TabsProps['items'] = [
    {
      key:      '1',
      label:    'J13',
      children: J13locationData && J13locationData?.length >= 1 ? <ColocationDisplay locationName={J13locationName} locationData={J13locationData}/> : <Empty description='Klientas kolokacijų J13 neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
    {
      key:      '2',
      label:    'T72',
      children: T72locationData && T72locationData?.length >= 1 ? <ColocationDisplay locationName={T72locationName} locationData={T72locationData}/> : <Empty description='Klientas kolokacijų T72 neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },

  ]
  return(
    <>
      { J13locationData && J13locationData?.length >= 1 || T72locationData && T72locationData?.length >= 1 ?
        <Tabs defaultActiveKey='1' items={items} />
        : <Empty description='Klientui nėra priskirtų kolokacijų' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  )
}

export default ClientsCollocations