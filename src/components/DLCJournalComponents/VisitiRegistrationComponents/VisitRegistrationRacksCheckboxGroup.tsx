/* eslint-disable max-len */
import {
  Card,
  Checkbox,
}                               from 'antd'

import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../store/hooks'

import { selectRacks }          from '../../../auth/SitesReducer/selectors'
import { Premises }             from '../../../types/globalTypes'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'

import {
  addToChecklist,
  removeFromChecklist,
}                               from '../../../auth/RacksReducer/RacksReducer'

import CollocationCardTitle     from './CollocationCardTitle'

type VisitRegistraTionRacksCheckboxGroupProps = {
    premise: Premises
}

const VisitRegistraTionRacksCheckboxGroup = ({ premise }: VisitRegistraTionRacksCheckboxGroupProps) => {
  const selectPremiseRacks  = useAppSelector((state) => selectRacks(state, premise._id))
  const racksIds            = selectPremiseRacks.map((el) => el._id)
  const checkboxOptions     =  selectPremiseRacks.map((el) => ({value: el._id || 'error', label: el.name || 'error'}))
  const dispatch            = useAppDispatch()
  const checkedList         = useAppSelector((state) => state.racks.checkedList).filter((el) => racksIds.includes(el))
  const companies           = useAppSelector((state) => state.visit.companies)
  const hasMatchingRacks    = companies.filter(company => company.racks.some(rack => checkedList.includes(rack))).length > 1
  const checkAll            = racksIds.every((el) => checkedList.includes(el))
  const indeterminate       = checkedList?.length > 0 && checkedList.length < selectPremiseRacks.length

  const onChange = (list: string[]) => {
    const filterCheckedRacks = selectPremiseRacks.filter((el) => !list.includes(el._id)).map((val) => val._id)
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
    <Card
      className='CollocationItemCard'
      key={premise._id}
      title={<CollocationCardTitle hasMatchingRacks={hasMatchingRacks} premise={premise.name}/>}
    >
      <div>
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
      </div>
    </Card>
  )
}

export default VisitRegistraTionRacksCheckboxGroup