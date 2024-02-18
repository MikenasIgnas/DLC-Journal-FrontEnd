/* eslint-disable max-len */
import {
  Card,
  Checkbox,
}                               from 'antd'
import { Premises }             from '../../../../types/globalTypes'
import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'
import { selectRacks }          from '../../../../auth/SitesReducer/selectors'
import {
  addToChecklist,
  removeFromChecklist,
  setCheckedList,
}                               from '../../../../auth/RacksReducer/RacksReducer'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'
import React                    from 'react'
import CollocationCardTitle     from '../../VisitiRegistrationComponents/CollocationCardTitle'

type VisitRegistraTionRacksCheckboxGroupProps = {
    premise: Premises
}

const EditableVisitRacks = ({ premise }: VisitRegistraTionRacksCheckboxGroupProps) => {
  const dispatch            = useAppDispatch()
  const companies           = useAppSelector((state) => state.visit.companies)
  const visitData           = useAppSelector((state)=> state.visit.visit)
  const selectPremiseRacks  = useAppSelector((state) => selectRacks(state, premise._id))
  const racksIds            = selectPremiseRacks.map((el) => el._id)
  const checkboxOptions     = selectPremiseRacks.map((el) => ({value: el._id || 'error', label: el.name || 'error'}))
  const checkedList         = useAppSelector((state) => state.racks.checkedList).filter((el) => racksIds.includes(el))
  const checkAll            = racksIds.every((el) => checkedList.includes(el))
  const indeterminate       = checkedList?.length > 0 && checkedList.length < selectPremiseRacks.length
  const hasMatchingRacks    = companies.filter(company => company.racks.some(rack => checkedList.includes(rack))).length > 1

  React.useEffect(() => {
    if(visitData?.racks){
      dispatch(setCheckedList(visitData.racks))
    }
  },[])

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

export default EditableVisitRacks