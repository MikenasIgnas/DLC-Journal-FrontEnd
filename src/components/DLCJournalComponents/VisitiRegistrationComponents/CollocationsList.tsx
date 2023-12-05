/* eslint-disable max-len */
import React                    from 'react'
import { Card, Checkbox, Form}  from 'antd'

type CollocationsType = {
  [key: string]: string[];
}

type CollocationsListProps = {
    companiesColocations: CollocationsType[] | undefined
}

const CollocationsList = ({companiesColocations}: CollocationsListProps) => {
  return (
    <Card title={'Kolokacijos'} style={{margin: '10px', backgroundColor: '#f9f9f9'}} >
      <div style={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
        {companiesColocations?.map((el, i) => {
          const objEntries = Object.entries(el)
          return(
            <Card style={{margin: '10px', width: '100%'}} key={i} title={objEntries[0][0]}>
              <Form.Item name={['visitCollocation', objEntries[0][0]]} >
                <Checkbox.Group options={objEntries[0][1]} key={i}/>
              </Form.Item>
            </Card>
          )})
        }
      </div>
    </Card>
  )
}

export default CollocationsList