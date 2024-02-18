/* eslint-disable max-len */
import {
  Card,
  Checkbox,
}                               from 'antd'

import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'

import { selectRacks }          from '../../../../auth/SingleCompanyReducer/selector'
import { PremiseRacks }         from '../../../../types/globalTypes'

import {
  addToChecklist,
  removeFromChecklist,
}                               from '../../../../auth/RacksReducer/RacksReducer'

import { CheckboxChangeEvent }  from 'antd/es/checkbox'

type SubClientsRacksListProps = {
    premise: PremiseRacks
}

const SubClientsRacksList = ({premise}: SubClientsRacksListProps) => {
  const premiseRacks        = useAppSelector((state) => selectRacks(state, premise._id))
  const checkedList         = useAppSelector((state) => state.racks.checkedList)
  const checkboxOptions     = premiseRacks.map(rack => ({ value: rack._id, label: rack.name }))
  const racksIds            = premiseRacks.map((el) => el._id)
  const checkAll            = racksIds.length > 0 && racksIds.every((el) => checkedList.includes(el))
  const dispatch            = useAppDispatch()

  const onChecboxChange = (list: string[]) => {
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
        onChange={(val) => onChecboxChange(val as string[])}
        options={checkboxOptions}
      />
    </Card>
  )
}

export default SubClientsRacksList