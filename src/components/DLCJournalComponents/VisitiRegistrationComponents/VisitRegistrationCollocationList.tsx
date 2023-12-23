/* eslint-disable max-len */
import React, { useState }      from 'react'
import { Card, Checkbox, Form } from 'antd'
import { CollocationType }      from '../../../types/globalTypes'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'

type CollocationsListProps = {
  companiesColocations: CollocationType[] | undefined;
  setCheckedList:       React.Dispatch<React.SetStateAction<CollocationType>>
  checkedList:          CollocationType
};

const VisitRegistrationCollocationList = ({ companiesColocations, setCheckedList, checkedList }: CollocationsListProps) => {
  const [checkAllStates, setCheckAllStates] = useState<{ [key: string]: boolean }>({})
  const onCheckAllChange = (e: CheckboxChangeEvent, values: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: e.target.checked ? values : [],
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: e.target.checked,
    }))
  }

  const onCheckboxChange = (list: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: list,
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: list.length === (companiesColocations?.find((collocation) => Object.keys(collocation)[0] === category)?.[category]?.length || 0),
    }))
  }

  return (
    <Card
      title={
        <div>
          Kolokacijos
        </div>
      }
      className='CollocationsListCard'
    >
      <div className='CollocationsListCardBody'>
        {companiesColocations?.map((el, i) => {
          const [category, values] = Object.entries(el)[0]
          return (
            <Card className='CollocationItemCard' key={i} title={category}>
              <Form.Item name={['visitCollocation', category]}>
                <Checkbox onChange={(e) => onCheckAllChange(e, values, category)} checked={checkAllStates[category]}>
                  {checkAllStates[category] ? 'Atžymėti visus' : 'Pažymėti visus'}
                </Checkbox>
                <Checkbox.Group options={values} value={checkedList[category]} onChange={(list: any) => onCheckboxChange(list, category)} />
              </Form.Item>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}

export default VisitRegistrationCollocationList