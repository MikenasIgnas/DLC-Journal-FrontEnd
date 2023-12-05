/* eslint-disable max-len */
import React                    from 'react'
import { Card, Checkbox, Form } from 'antd'

type CollocationsType = {
    [key: string]: string[];
}

type SelectedCollocationListProps = {
    selectedCollocations: CollocationsType[] | undefined
    edit: boolean
}

const SelectedCollocationList = ({selectedCollocations, edit}: SelectedCollocationListProps) => {
  return (
    <Card title={'Kolokacijos'} style={{margin: '10px', backgroundColor: '#f9f9f9'}} >
      <div style={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
        {selectedCollocations?.map((el, i) => {
          const objEntries = Object.entries(el)
          return(
            <Card style={{ margin: '10px', width: '100%' }} key={i} title={objEntries[0][0]}>
              <Form.Item initialValue={objEntries[0][1]} name={['visitCollocation', objEntries[0][0]]}>
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
    </Card>
  )
}

export default SelectedCollocationList