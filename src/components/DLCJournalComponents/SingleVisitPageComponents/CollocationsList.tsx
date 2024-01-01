/* eslint-disable max-len */
import React                    from 'react'
import { Card, Checkbox, Form}  from 'antd'
import { CollocationType }      from '../../../types/globalTypes'
import CollocationCardTitle     from '../VisitiRegistrationComponents/CollocationCardTitle'

type CollocationsListProps = {
    companiesColocations: CollocationType[] | undefined
}

const CollocationsList = ({companiesColocations}: CollocationsListProps) => {
  return (
    <Card title={'Kolokacijos'} className='CollocationsListCard'>
      <div className='CollocationsListCardBody'>
        {companiesColocations?.map((el, i) => {
          const objEntries = Object.entries(el)
          const [category, values] = objEntries[0]
          return(
            <Card className='CollocationItemCard' key={i} title={<CollocationCardTitle category={category} values={values} index={i}/>}>
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
