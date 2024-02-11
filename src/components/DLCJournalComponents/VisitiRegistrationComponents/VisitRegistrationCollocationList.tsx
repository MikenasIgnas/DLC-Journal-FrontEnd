/* eslint-disable max-len */
import React                                from 'react'
import { Card }                             from 'antd'
import { CompaniesType, Premises, Racks } from '../../../types/globalTypes'
import RacksCheckboxGroup                   from './RacksCheckboxGroup'

type CollocationsListProps = {
  setCheckedList:       React.Dispatch<React.SetStateAction<string[]>>
  checkedList:          string[]
  companyPremise:       Premises[]
  companyRacks:         Racks[]
  companies: CompaniesType[]
};

const VisitRegistrationCollocationList = ({ setCheckedList, checkedList, companyPremise, companyRacks, companies }: CollocationsListProps) => {
  return (
    <Card
      title='Kolokacijos'
      className='CollocationsListCard'
    >
      {companyPremise.map((el) =>
        <RacksCheckboxGroup
          key={el._id}
          companies={companies}
          companyRacks={companyRacks}
          premise={el}
          setCheckedList={setCheckedList}
          checkedList={checkedList}
        />
      )}
    </Card>
  )
}

export default VisitRegistrationCollocationList