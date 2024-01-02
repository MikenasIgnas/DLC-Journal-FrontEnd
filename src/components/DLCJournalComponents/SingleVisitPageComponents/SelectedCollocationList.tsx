/* eslint-disable max-len */
import React                            from 'react'
import { Card, Checkbox, Empty, Form }  from 'antd'
import CollocationCardTitle             from '../VisitiRegistrationComponents/CollocationCardTitle'

type CollocationsType = {
    [key: string]: string[];
}

type SelectedCollocationListProps = {
    selectedCollocations: CollocationsType[] | undefined
    edit:                 boolean
}

const SelectedCollocationList = ({selectedCollocations, edit}: SelectedCollocationListProps) => {
  return (
    <Card title={'Kolokacijos'} className='SelectedCollocationListContainer' >
      {
        selectedCollocations && selectedCollocations?.length > 0 ?
          <div className='SelectedCollocationListBody'>
            {selectedCollocations?.map((el, i) => {
              const objEntries = Object.entries(el)
              const [category, values] = objEntries[0]
              return(
                <Card className='SelectedCollocationListItem' key={i} title={<CollocationCardTitle category={category} values={values} index={i}/>}
                >
                  <Form.Item rules={[{ required: true, message: 'pasirinkite kolokacijas' }]} initialValue={objEntries[0][1]} name={['visitCollocation', objEntries[0][0]]}>
                    <Checkbox.Group>
                      {objEntries[0][1].map((option, index) => (
                        <Checkbox disabled={!edit} key={index} value={option}>
                          {option}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </Card>
              )})
            }
          </div>
          :<Empty description='Klientui nėra priskirtų kolokacijų' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </Card>
  )
}

export default SelectedCollocationList