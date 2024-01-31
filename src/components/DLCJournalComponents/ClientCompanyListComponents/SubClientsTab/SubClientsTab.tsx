/* eslint-disable max-len */
import React                                                            from 'react'
import { CollocationsSites, CompaniesType, SubClientsCollocationsType } from '../../../../types/globalTypes'
import { put }                                                         from '../../../../Plugins/helpers'
import { useCookies }                                                   from 'react-cookie'
import { useAppDispatch, useAppSelector }                               from '../../../../store/hooks'
import SubClientAdditionModal                                           from '../CompanyAdditionComponent/SubClientAdditionModal'
import SubClientAddition                                                from './SubClientAddition'
import SubClients                                                       from './SubClients'
import { setIsSubClientAdded }                                          from '../../../../auth/AddSubClientReducer/addSubClientReducer'

type SubClientsTabProps = {
  parentCompanyId:    string | undefined;
  collocationsSites:  CollocationsSites
  mainCompanies:      CompaniesType[]
  setMainCompanies:   React.Dispatch<React.SetStateAction<CompaniesType[]>>
}

const SubClientsTab = ({ parentCompanyId, collocationsSites, mainCompanies, setMainCompanies}: SubClientsTabProps) => {
  const [cookies]                                           = useCookies(['access_token'])
  const [selectedValue, setSelectedValue]                   = React.useState(null)
  const [subClientsCollocations, setSubClientsCollocations] = React.useState<SubClientsCollocationsType>([])
  const openSubClientAdditionModal                          = useAppSelector((state) => state.modals.openSubClientAdditionModal)
  const dispatch                                            = useAppDispatch()

  React.useEffect(() => {
    const newSubClientsCollocations = []
    let newIndex = 1
    for (const site in collocationsSites) {
      const premisesData = collocationsSites[site]
      const premisesArray = premisesData?.map(premiseData => {
        const premiseName = Object.keys(premiseData)[0]
        const racks = premiseData[premiseName]
        return {
          premiseName,
          racks,
        }
      })

      newSubClientsCollocations.push({
        site,
        id:       newIndex++,
        premises: premisesArray,
      })
    }
    setSubClientsCollocations(newSubClientsCollocations)
  }, [collocationsSites])

  const mainCompaniesOptions = mainCompanies?.map((el) => {
    return{
      value: el._id,
      label: el.name,
    }
  })

  const handleChange = async(value: string) => {
    const selectedMainCompany   = mainCompanies?.filter((el) => el._id === value)
    if(selectedMainCompany){
      setMainCompanies(selectedMainCompany)
      await put('company/company', {id: value, parentId: parentCompanyId}, cookies.access_token)
      dispatch(setIsSubClientAdded(true))
    }
  }

  const onSelect = () => {
    setSelectedValue(null)
  }

  return (
    <div className='SubClientsTabContainer'>
      {openSubClientAdditionModal &&
        <SubClientAdditionModal
          parentCompanyId={parentCompanyId}
          collocations={subClientsCollocations}
          additionModalTitle={'Pridėkite sub klientą'}
          postUrl={'company/company'}
        />
      }
      <SubClientAddition
        selectedValue={selectedValue}
        handleChange={handleChange}
        mainCompaniesOptions={mainCompaniesOptions}
        handleSelect={onSelect}
      />
      <SubClients
        subClientsCollocations={collocationsSites}
        parentCompanyId={parentCompanyId}
      />
    </div>
  )
}

export default SubClientsTab