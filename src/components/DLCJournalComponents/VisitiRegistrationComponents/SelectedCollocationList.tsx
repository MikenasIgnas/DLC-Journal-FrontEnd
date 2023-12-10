/* eslint-disable max-len */
import React                    from 'react'
import { Card, Checkbox, Form } from 'antd'

type CollocationsType = {
    [key: string]: string[];
}

type SelectedCollocationListProps = {
    selectedCollocations: CollocationsType[] | undefined
    edit:                 boolean
}

const SelectedCollocationList = ({selectedCollocations, edit}: SelectedCollocationListProps) => {
  const mixedRacks = [
    {premise: 'C1', racks: ['S2.6']},
    {premise: 'RA2', racks: ['S7.4']},
    {premise: 'RA2', racks: ['S8.1']},
    {premise: 'DC5', racks: ['S1.1']},
    {premise: 'DC5', racks: ['S2.3']},
  ]
  return (
    <Card title={'Kolokacijos'} className='SelectedCollocationListContainer' >
      <div className='SelectedCollocationListBody'>
        {selectedCollocations?.map((el, i) => {
          const objEntries = Object.entries(el)
          const mix = mixedRacks.some((rack) => rack.premise === objEntries[0][0] && rack.racks.some((value) => objEntries[0][1].includes(value)))
          return(
            <Card className='SelectedCollocationListItem' key={i} title={
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{objEntries[0][0]}</div>
                {mix ? <div className='ErrorText'>Reikalinga DLC inžinieriaus palyda</div> : null}
              </div>}
            >
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