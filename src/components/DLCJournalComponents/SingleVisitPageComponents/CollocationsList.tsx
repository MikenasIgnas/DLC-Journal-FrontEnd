/* eslint-disable max-len */
import { Card, Checkbox, Empty, Form}   from 'antd'
import { CollocationType }              from '../../../types/globalTypes'
import CollocationCardTitle             from '../VisitiRegistrationComponents/CollocationCardTitle'

type CollocationsListProps = {
    companiesColocations: CollocationType[] | undefined
}

const CollocationsList = ({companiesColocations}: CollocationsListProps) => {
  return (
    <>
      {
        companiesColocations && companiesColocations?.length > 0 ?
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
          :
          <Empty description='Klientui nėra priskirtų kolokacijų' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  )
}

export default CollocationsList
