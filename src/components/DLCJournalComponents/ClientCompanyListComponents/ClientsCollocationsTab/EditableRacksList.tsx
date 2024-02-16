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
  const checkedList = useAppSelector((state) => state.racks.checkedList)
  const dispatch = useAppDispatch()
  const company = useAppSelector((state) => state.singleCompany.singleCompany)

  React.useEffect(() => {
    if(company?.racks){
      dispatch(setCheckedList(company.racks))
    }
  },[])

  const racksIds            = premise.racks.map((el) => el._id)
  const checkAll            = racksIds.every((el) => checkedList.includes(el))
  const indeterminate       = checkedList?.length > 0 && checkedList.length < premise.racks.length
  const checkboxOptions     =  premise.racks.map((el) => ({value: el._id || 'error', label: el.name || 'error'}))
  const onChange = (list: string[]) => {
    const filterCheckedRacks = premise.racks.filter((el) => !list.includes(el._id)).map((val) => val._id)
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
        indeterminate={indeterminate}
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