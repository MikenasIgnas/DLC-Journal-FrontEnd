/* eslint-disable max-len */
import React                              from 'react'
import { CheckboxValueType }              from 'antd/es/checkbox/Group'
import RacksCheckboxGroup                 from '../../VisitiRegistrationComponents/RacksCheckboxGroup'
import { CompaniesType, Premises, Racks } from '../../../../types/globalTypes'

type EditableVisitPremisesProps = {
  companyRacks:    Racks[] | undefined
  setCheckedList:  React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>
  checkedList:     CheckboxValueType[] | undefined
  siteId:          string | null | undefined
  companyPremise:  Premises[]
  companies:       CompaniesType[]
  visitDataRacks:  string[] | undefined
}

const EditableVisitPremises = ({checkedList, setCheckedList, companyRacks, companyPremise, companies, visitDataRacks}: EditableVisitPremisesProps) => {

  return (
    <div className='EditableCollocationContainer'>
      {companyPremise.map((el) =>
        <RacksCheckboxGroup
          key={el._id}
          companies={companies}
          companyRacks={companyRacks}
          premise={el}
          setCheckedList={setCheckedList}
          checkedList={checkedList}
          visitDataRacks={visitDataRacks}
        />
      )}
    </div>
  )
}

export default EditableVisitPremises