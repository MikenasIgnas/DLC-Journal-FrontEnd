/* eslint-disable max-len */
import {
  Card,
  Checkbox,
}                               from 'antd'

import { PremiseRacks }         from '../../../../types/globalTypes'

import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'

import {
  addToChecklist,
  removeFromChecklist,
  setCheckedList,
}                               from '../../../../auth/RacksReducer/RacksReducer'

import { CheckboxChangeEvent }  from 'antd/es/checkbox'
import React                    from 'react'

type ColocationSelectorsProps = {
  premise:             PremiseRacks
};

const EditableRacksList = ({ premise }: ColocationSelectorsProps) => {
  const checkedList     = useAppSelector((state) => state.racks.checkedList)
  const dispatch        = useAppDispatch()
  const company         = useAppSelector((state) => state.singleCompany.singleCompany)
  const racksIds        = premise.racks.map((el) => el._id)
  const checkAll        = racksIds.length > 0 && racksIds.every((el) => checkedList.includes(el))
  const checkboxOptions = premise.racks.map(rack => ({ value: rack._id, label: rack.name }))

  React.useEffect(() => {
    if(company?.racks){
      dispatch(setCheckedList(company.racks))
    }
  },[])

  const onChange = (list: string[]) => {
    const filterCheckedRacks = racksIds.filter(id => !list.includes(id))
    dispatch(addToChecklist(list))
    dispatch(removeFromChecklist(filterCheckedRacks))
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if(e.target.checked){
      dispatch(addToChecklist(racksIds))
    }else{
      dispatch(removeFromChecklist(racksIds))
    }
  }

  return (
    <Card title={premise.name}>
      <Checkbox
        onChange={onCheckAllChange}
        checked={checkAll}
      >
          Check All
      </Checkbox>
      <Checkbox.Group
        value={checkedList}
        onChange={(val) => onChange(val as string[])}
        options={checkboxOptions}
      />
    </Card>
  )
}

export default EditableRacksList