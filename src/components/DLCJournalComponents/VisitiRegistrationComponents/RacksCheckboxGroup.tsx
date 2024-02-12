/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                              from 'react'
import { Card, Checkbox }                 from 'antd'
import { Premises }                       from '../../../types/globalTypes'
import { CheckboxChangeEvent }            from 'antd/es/checkbox'
import CollocationCardTitle               from './CollocationCardTitle'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setCheckedList }                 from '../../../auth/RacksReducer/RacksReducer'
import { useSearchParams } from 'react-router-dom'

type RacksCheckboxGroupProps = {
    premise:          Premises;
    visitDataRacks?:  string[] | undefined
};

const RacksCheckboxGroup = ({ premise, visitDataRacks }: RacksCheckboxGroupProps) => {
  const checkedList     = useAppSelector((state) => state.racks.checkedList)
  const companyRacks    = useAppSelector((state) => state.racks.racks)
  const dispatch        = useAppDispatch()
  const companies       = useAppSelector((state) => state.visit.companies)
  const [searchParams]  = useSearchParams()
  const siteId = searchParams.get('addressId')

  const matchingCompanies = companies.filter(company =>
    company.racks.some(rack => (checkedList && checkedList?.length > 0 ? checkedList : visitDataRacks)?.includes(rack))
  )

  const [hasMatchingRacks, setHasMatchingRacks] = React.useState<boolean | undefined>(matchingCompanies.length > 1)
  const racks                                   = companyRacks?.filter((el) => el.premiseId === premise._id)
  const mappedRacks                             = racks?.map((item) => ({ value: item._id || 'error', label: item.name || 'error' }))
  const safeCheckedList                         = Array.isArray(checkedList) ? checkedList : []

  React.useEffect(() => {
    if (visitDataRacks && visitDataRacks.length > 0 && (!checkedList || checkedList.length === 0)) {
      dispatch(setCheckedList(visitDataRacks))
    }
  }, [visitDataRacks])

  const allChecked = racks && racks.length > 0 && racks.every(rack => checkedList?.includes(rack._id as string))
  const someChecked = racks?.some(rack => checkedList?.includes(rack._id as string)) && !allChecked
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked && safeCheckedList) {
      const newCheckedList = Array.from(new Set([...safeCheckedList, ...racks?.map(rack => rack._id).filter(id => id !== undefined) || []] as string[]))
      const matchingCompanies = companies?.filter(company => company.racks.some(rack => newCheckedList.includes(rack)))
      dispatch(setCheckedList(newCheckedList))
      if(matchingCompanies && matchingCompanies.length > 1){
        setHasMatchingRacks(true)
      }else{
        setHasMatchingRacks(false)
      }
    } else {
      const currentGroupIds = racks?.map(rack => rack._id)
      const newCheckedList = safeCheckedList?.filter(id => !currentGroupIds?.includes(id as string))
      const matchingCompanies = companies?.filter(company => company.racks.some(rack => newCheckedList?.includes(rack)))

      if(matchingCompanies && matchingCompanies.length > 1){
        setHasMatchingRacks(true)
      }else{
        setHasMatchingRacks(false)
      }
      dispatch(setCheckedList(newCheckedList))
    }
  }

  const onCheckboxChange = (checkedValues: string[]) => {
    const checkedIds = checkedValues.map(value => value.toString())
    if(safeCheckedList){
      const newCheckedList = [...new Set([...safeCheckedList.filter(id => !racks?.map(rack => rack._id).includes(id as string)), ...checkedIds])] as string[]
      dispatch(setCheckedList(newCheckedList))
      const matchingCompanies = companies?.filter(company => company.racks.some(rack => checkedValues.includes(rack)))
      if(matchingCompanies.length > 1){
        setHasMatchingRacks(true)
      }else{
        setHasMatchingRacks(false)
      }
    }
  }

  return (
    <Card className='CollocationItemCard' key={premise._id} title={<CollocationCardTitle hasMatchingRacks={hasMatchingRacks} premise={premise.name}/>}>
      <div>
        <Checkbox
          disabled={!siteId}
          indeterminate={someChecked}
          onChange={onCheckAllChange}
          checked={allChecked}
        >
        Check All
        </Checkbox>
        <Checkbox.Group
          disabled={!siteId}
          options={mappedRacks}
          value={checkedList}
          onChange={(val) => typeof val === 'string' && onCheckboxChange(val)}
        />
      </div>
    </Card>
  )
}

export default RacksCheckboxGroup