/* eslint-disable max-len */
import React, { useState }      from 'react'
import {
  Card,
  Checkbox,
  Form,
  Tag,
}                               from 'antd'
import {
  CollocationType,
  CollocationsType,
  CompaniesType,
  CompanyInfoType,
}                               from '../../../types/globalTypes'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'

type CollocationsListProps = {
  companiesColocations: CollocationType[] | undefined;
  setCheckedList:       React.Dispatch<React.SetStateAction<CollocationType>>
  checkedList:          CollocationType
  allCompanies:         CompaniesType[] | undefined
  allCollocations:      CollocationsType[] | undefined
};


type MatchingCompaniesType = {
  companyName:  string;
  premiseName:  string;
  racks:        string[]
}

const VisitRegistrationCollocationList = ({ companiesColocations, setCheckedList, checkedList, allCompanies, allCollocations }: CollocationsListProps) => {
  const [checkAllStates, setCheckAllStates] = useState<{ [key: string]: boolean }>({})

  const onCheckAllChange = (e: CheckboxChangeEvent, values: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: e.target.checked ? values : [],
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: e.target.checked,
    }))
  }

  const onCheckboxChange = (list: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: list,
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: list.length === (companiesColocations?.find((collocation) => Object.keys(collocation)[0] === category)?.[category]?.length || 0),
    }))
  }

  const getMatchingCompanies = (allCollocations: CollocationsType[] | undefined, companyInfo: CompanyInfoType) => {
    const matchingCompanies: MatchingCompaniesType[] = []
    Object.keys(companyInfo).forEach((site) => {
      const siteCollocations = allCollocations?.find((collocation) => collocation.site === site)
      if (siteCollocations) {
        const companyColl = companyInfo[site]
        companyColl?.forEach((company) => {
          const premises = siteCollocations.premises.find((el) => Object.keys(company)[0] === el.premiseName)
          if (premises) {
            const racks = company[Object.keys(company)[0]]
            const matchingRacks = premises.racks.filter((rack) => racks.includes(rack))
            if (matchingRacks.length > 0) {
              matchingCompanies.push({
                companyName: companyInfo.companyName,
                premiseName: premises.premiseName,
                racks:       matchingRacks,
              })
            }
          }
        })
      }
    })
    return matchingCompanies
  }

  const companyCollocation = allCompanies?.map((el) => getMatchingCompanies(allCollocations, el.companyInfo)).flat().flat()


  return (
    <Card
      title='Kolokacijos'
      className='CollocationsListCard'
    >
      <div className='CollocationsListCardBody'>
        {companiesColocations?.map((el, i) => {
          const [category, values] = Object.entries(el)[0]
          const companiesWithMatchingRacks = new Set()
          let hasMatchingRack = false

          companyCollocation?.forEach((match, j) => {
            if (i !== j) {
              const doCompaniesHaveMatchingRacks = match.racks.some(rack => values.includes(rack)) &&
              match.premiseName === category

              if (doCompaniesHaveMatchingRacks) {
                companiesWithMatchingRacks.add(match.companyName)
                hasMatchingRack = true
              }
            }
          })

          return (
            <Card className='CollocationItemCard' key={i} title={category}>
              {hasMatchingRack && companiesWithMatchingRacks.size > 1 && (
                <Tag key={`${category}-tag`} color='blue'>
                Reikalinga DLC inžinieriaus palyda
                </Tag>
              )}

              <Form.Item name={['visitCollocation', category]}>
                <Checkbox onChange={(e) => onCheckAllChange(e, values, category)} checked={checkAllStates[category]}>
                  {checkAllStates[category] ? 'Atžymėti visus' : 'Pažymėti visus'}
                </Checkbox>
                <Checkbox.Group options={values} value={checkedList[category]} onChange={(list: any) => onCheckboxChange(list, category)} />
              </Form.Item>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}

export default VisitRegistrationCollocationList