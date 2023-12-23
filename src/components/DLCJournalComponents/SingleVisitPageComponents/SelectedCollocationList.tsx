/* eslint-disable max-len */
import React from 'react'
import { Card, Checkbox, Form } from 'antd'
import { CollocationType } from '../../../types/globalTypes'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

type CollocationsType = {
  [key: string]: string[];
};

type SelectedCollocationListProps = {
  selectedCollocations: CollocationsType[] | undefined;
  edit?: boolean;
  setCheckedList: React.Dispatch<React.SetStateAction<CollocationType>>;
  checkedList: CollocationType;
};

const SelectedCollocationList = ({ selectedCollocations, edit, checkedList, setCheckedList }: SelectedCollocationListProps) => {
  return (
    <Card title={'KolokacijosInitial'} className='SelectedCollocationListContainer'>
      {selectedCollocations?.map((el, i) => {
        const [premise] = Object.entries(el)[0]
        const objEntries = Object.entries(el)
        return (
          <Card className='CollocationItemCard' key={i} title={premise}>
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
        )
      })}
    </Card>
  )
}

export default SelectedCollocationList
