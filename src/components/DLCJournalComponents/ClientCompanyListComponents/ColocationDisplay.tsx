/* eslint-disable max-len */
import React                  from 'react'
import { Card, Divider, List }            from 'antd'
import { ColocationDataType } from '../../../types/globalTypes'

type ColocationViewProps = {
    locationName: string;
    locationData: ColocationDataType[] | undefined;
}

const ColocationDisplay = ({locationName, locationData}:ColocationViewProps) => {
  const collocations = locationData?.map(obj => {
    const key = Object.keys(obj)[0]
    const values = obj[key]
    return { key, values }
  })

  const totalItemCount = locationData?.reduce((count, obj) => count + Object.values(obj)[0].length, 0)

  return (
    <div style={{width: '100%'}}>
      {locationData && <Divider>{locationName}</Divider>}
      <Card style={{display: 'flex', justifyContent: 'space-between', border: '1px solid #d9d9d9'}} >
        {collocations?.map((el, i) =>
          <div key={i}>
            {<List
              key={i}
              size='small'
              header={<strong>{el.key}</strong>}
              footer={
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <strong>{`Spintos: ${el.values.length}`}</strong>
                </div>
              }
              bordered
              dataSource={el.values}
              renderItem={(item) =>
                <List.Item>
                  {item}
                </List.Item>
              }/>}
          </div>
        )}
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
          <strong>{`Kolokacijos ${locationName}: ${locationData?.length}`}</strong>
          <strong>{`Spintos: ${totalItemCount}`}</strong>
        </div>
      </Card>
    </div>
  )
}

export default ColocationDisplay