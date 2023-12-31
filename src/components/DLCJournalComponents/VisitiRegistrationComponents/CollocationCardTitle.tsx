/* eslint-disable max-len */
import React from 'react'
import { CollocationsType, CompaniesType, CompanyInfoType } from '../../../types/globalTypes'
import { get } from '../../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import { Tag } from 'antd'

type DLCEmployeeEscortTagProps = {
  category: string;
  values: string[];
  index: number;
};

type MatchingCompaniesType = {
  companyName: string;
  premiseName: string;
  racks: string[];
  site: string;
};

const CollocationCardTitle = ({ category, values, index }: DLCEmployeeEscortTagProps) => {
  const [cookies] = useCookies(['access_token'])
  const [allCollocations, setAllCollocations] = React.useState<CollocationsType[]>()
  const [allCompanies, setAllCompanies] = React.useState<CompaniesType[]>()

  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const collocations = await get('getCollocations', cookies.access_token)
      setAllCollocations(collocations.data[0].colocations)
      setAllCompanies(companies.data)
    })()
  }, [])

  const getMatchingCompanies = (
    allCollocations: CollocationsType[] | undefined,
    companyInfo: CompanyInfoType
  ) => {
    const matchingCompanies: MatchingCompaniesType[] = []
    Object.keys(companyInfo).forEach((site) => {
      const siteCollocations = allCollocations?.find((collocation) => collocation.site === site)
      if (siteCollocations) {
        const companyColl = companyInfo[site]
        companyColl?.forEach((company) => {
          const premises = siteCollocations.premises.find(
            (el) => Object.keys(company)[0] === el.premiseName
          )
          if (premises) {
            const racks = company[Object.keys(company)[0]]
            const matchingRacks = premises.racks.filter((rack) => racks.includes(rack))
            if (matchingRacks.length > 0) {
              matchingCompanies.push({
                companyName: companyInfo.companyName,
                premiseName: premises.premiseName,
                racks:       matchingRacks,
                site:        site,
              })
            }
          }
        })
      }
    })
    return matchingCompanies
  }

  const companyCollocation = allCompanies
    ?.map((el) => getMatchingCompanies(allCollocations, el.companyInfo))
    .flat()


  const companiesHasMatchingRacks  = companyCollocation?.map((match, i) => {
    if (
      index !== i &&
        match.racks.some((rack) => values.includes(rack)) &&
        match.premiseName === category
    ){
      return match
    }
  })

  const companiesWithMatchingRacks = companiesHasMatchingRacks?.filter((el) => el !== undefined)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{category}</div>
      {
        companiesWithMatchingRacks && companiesWithMatchingRacks?.length > 1 &&
        <Tag color='blue'>
              Reikalinga DLC inžinieriaus palyda
        </Tag>
      }
    </div>
  )
}

export default CollocationCardTitle
