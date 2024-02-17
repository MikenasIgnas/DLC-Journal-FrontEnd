/* eslint-disable max-len */
import React                              from 'react'
import { put }                            from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import SubClientAdditionModal             from '../CompanyAdditionComponent/SubClientAdditionModal'
import SubClientAddition                  from './SubClientAddition'
import SubClients                         from './SubClients'
import { setIsSubClientAdded }            from '../../../../auth/AddSubClientReducer/addSubClientReducer'
import { setParentCompanies }             from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import { useParams }                      from 'react-router'


const SubClientsTab = () => {
  const [cookies]                         = useCookies(['access_token'])
  const [selectedValue, setSelectedValue] = React.useState(null)
  const openSubClientAdditionModal        = useAppSelector((state) => state.modals.openSubClientAdditionModal)
  const dispatch                          = useAppDispatch()
  const parentCompanies                   = useAppSelector((state) => state.singleCompany.parentCompanies)
  const { id }                            = useParams()

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
      {openSubClientAdditionModal && <SubClientAdditionModal/>}
      <SubClientAddition
        selectedValue={selectedValue}
        handleChange={handleChange}
        handleSelect={onSelect}
      />
      <SubClients/>
    </div>
  )
}

export default SubClientsTab