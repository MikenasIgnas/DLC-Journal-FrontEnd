/* eslint-disable max-len */
import React                                                            from 'react'
import { CollocationsSites, SubClientsCollocationsType }                from '../../../../types/globalTypes'
import { put }                                                          from '../../../../Plugins/helpers'
import { useCookies }                                                   from 'react-cookie'
import { useAppDispatch, useAppSelector }                               from '../../../../store/hooks'
import SubClientAdditionModal                                           from '../CompanyAdditionComponent/SubClientAdditionModal'
import SubClientAddition                                                from './SubClientAddition'
import SubClients                                                       from './SubClients'
import { setIsSubClientAdded }                                          from '../../../../auth/AddSubClientReducer/addSubClientReducer'
import { setParentCompanies }                                           from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import { useParams }                                                    from 'react-router'

type SubClientsTabProps = {
  collocationsSites:  CollocationsSites
}

const SubClientsTab = ({ collocationsSites }: SubClientsTabProps) => {
  const [cookies]                                           = useCookies(['access_token'])
  const [selectedValue, setSelectedValue]                   = React.useState(null)
  const [subClientsCollocations, setSubClientsCollocations] = React.useState<SubClientsCollocationsType>([])
  const openSubClientAdditionModal                          = useAppSelector((state) => state.modals.openSubClientAdditionModal)
  const dispatch                                            = useAppDispatch()
  const parentCompanies                                     = useAppSelector((state) => state.singleCompany.parentCompanies)
  const { id } = useParams()
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

  const mainCompaniesOptions = parentCompanies?.map((el) => {
    return{
      value: el._id,
      label: el.name,
    }
  })

  const handleChange = async(value: string) => {
    const selectedParentCompanies   = parentCompanies?.filter((el) => el._id === value)
    if(selectedParentCompanies){
      dispatch(setParentCompanies(selectedParentCompanies))
      await put('company/company', {id: value, parentId: id}, cookies.access_token)
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
      />
    </div>
  )
}

export default SubClientsTab