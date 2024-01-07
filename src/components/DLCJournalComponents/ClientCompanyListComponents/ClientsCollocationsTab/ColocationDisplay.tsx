/* eslint-disable max-len */
import React                    from 'react'
import { Card, Divider, List }  from 'antd'
import { ColocationDataType }   from '../../../../types/globalTypes'

type ColocationViewProps = {
    locationName: string | undefined;
    locationData: ColocationDataType[] | undefined;
}

const ColocationDisplay = ({locationName, locationData}:ColocationViewProps) => {
  const collocations = locationData?.map(obj => {
    const key     = Object.keys(obj)[0]
    const values  = obj[key]
    return { key, values }
  })

  const totalItemCount = locationData?.reduce((count, obj) => count + Object.values(obj)[0].length, 0)

  return (
    <div>
      {locationData && <Divider>{locationName}</Divider>}
      <Card className='CollocationDisplayCard' >
        {collocations?.map((el, i) =>
          <div key={i}>
            {<List
              key={i}
              size='small'
              header={<strong>{el.key}</strong>}
              footer={
                <div className='CollocationDisplayFooter'>
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
        <div className='CollocationDisplayCounter'>
          <strong>{`Kolokacijos ${locationName}: ${locationData?.length}`}</strong>
          <strong>{`Spintos: ${totalItemCount}`}</strong>
        </div>
      </Card>
    </div>
  )
}

export default ColocationDisplay