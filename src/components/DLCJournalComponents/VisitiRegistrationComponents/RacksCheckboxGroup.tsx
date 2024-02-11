/* eslint-disable max-len */
import React                              from 'react'
import { Card, Checkbox }                 from 'antd'
import { CompaniesType, Premises, Racks } from '../../../types/globalTypes'
import { CheckboxValueType }              from 'antd/es/checkbox/Group'
import { CheckboxChangeEvent }            from 'antd/es/checkbox'
import CollocationCardTitle               from './CollocationCardTitle'

type RacksCheckboxGroupProps = {
    companyRacks:   Racks[] | undefined;
    premise:        Premises;
    setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>;
    checkedList:    CheckboxValueType[] | undefined
    companies:      CompaniesType[]
    siteId?:        string | null | undefined
    visitDataRacks: string[] | undefined
};

const RacksCheckboxGroup = ({ companyRacks, premise, checkedList, setCheckedList, companies, siteId, visitDataRacks }: RacksCheckboxGroupProps) => {

  const matchingCompanies = companies.filter(company =>
    company.racks.some(rack => (checkedList && checkedList?.length > 0 ? checkedList : visitDataRacks)?.includes(rack))
  )

  const [hasMatchingRacks, setHasMatchingRacks] = React.useState<boolean | undefined>(matchingCompanies.length > 1)
  const racks                                   = companyRacks?.filter((el) => el.premiseId === premise._id)
  const mappedRacks                             = racks?.map((item) => ({ value: item._id || 'error', label: item.name || 'error' }))
  const safeCheckedList                         = Array.isArray(checkedList) ? checkedList : []

  React.useEffect(() => {
    if (visitDataRacks && visitDataRacks.length > 0 && (!checkedList || checkedList.length === 0)) {
      setCheckedList(visitDataRacks)
    }
  }, [visitDataRacks])

  const allChecked = racks && racks.length > 0 && racks.every(rack => checkedList?.includes(rack._id as string))
  const someChecked = racks?.some(rack => checkedList?.includes(rack._id as string)) && !allChecked
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked && safeCheckedList) {
      const newCheckedList = Array.from(new Set([...safeCheckedList, ...racks?.map(rack => rack._id).filter(id => id !== undefined) || []] as string[]))
      const matchingCompanies = companies?.filter(company => company.racks.some(rack => newCheckedList.includes(rack)))
      setCheckedList(newCheckedList)
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
      setCheckedList(newCheckedList)
    }
  }

  const onCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    const checkedIds = checkedValues.map(value => value.toString())
    if(safeCheckedList){
      const newCheckedList = [...new Set([...safeCheckedList.filter(id => !racks?.map(rack => rack._id).includes(id as string)), ...checkedIds])] as string[]
      setCheckedList(newCheckedList)
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
          disabled={!!siteId}
          indeterminate={someChecked}
          onChange={onCheckAllChange}
          checked={allChecked}
        >
        Check All
        </Checkbox>
        <Checkbox.Group
          disabled={!!siteId}
          options={mappedRacks}
          value={checkedList}
          onChange={onCheckboxChange}
        />
      </div>
    </Card>
  )
}

export default RacksCheckboxGroup