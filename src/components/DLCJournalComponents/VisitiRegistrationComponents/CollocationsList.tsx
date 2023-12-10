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
    <Card title={'Kolokacijos'} className='CollocationsListCard'>
      <div className='CollocationsListCardBody'>
        {companiesColocations?.map((el, i) => {
          const objEntries = Object.entries(el)
          return(
            <Card className='CollocationItemCard' key={i} title={objEntries[0][0]}>
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