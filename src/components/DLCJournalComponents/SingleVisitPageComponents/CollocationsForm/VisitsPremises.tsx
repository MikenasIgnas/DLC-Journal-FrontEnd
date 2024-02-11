/* eslint-disable max-len */
import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import RacksCheckboxGroup from '../../VisitiRegistrationComponents/RacksCheckboxGroup'
import { CompaniesType } from '../../../../types/globalTypes'
import { CheckboxValueType } from 'antd/es/checkbox/Group'


type VisitsSitesProps = {
  siteId: string | null | undefined
  companyRacks: string[] | undefined
  setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>
  checkedList: CheckboxValueType[] | undefined
  companies: CompaniesType[]
}

const VisitsPremises = ({ companyRacks, checkedList, setCheckedList, companies, siteId }: VisitsSitesProps) => {
  const racks           = useAppSelector((state) => state.sites.racks)?.filter((el) => el?._id !== undefined && companyRacks?.includes(el._id))
  const racksPremiseIds = racks?.map((el) => el.premiseId)
  const premise         = useAppSelector((state) => state.sites.premise)?.filter((el) => racksPremiseIds?.includes(el._id))

  return (
    <div>{
      premise?.map((el) =>
        <RacksCheckboxGroup
          key={el._id}
          siteId={siteId}
          companyRacks={racks}
          visitDataRacks={companyRacks}
          premise={el}
          setCheckedList={setCheckedList}
          checkedList={checkedList}
          companies={companies}
        />)
    }</div>
  )
}

export default VisitsPremises