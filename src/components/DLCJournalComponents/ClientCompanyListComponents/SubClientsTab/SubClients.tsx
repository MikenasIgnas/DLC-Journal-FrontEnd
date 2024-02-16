/* eslint-disable max-len */
import React, { useState }                            from 'react'
import { Button, Divider, List }                      from 'antd'
import { deleteItem, get, put }                       from '../../../../Plugins/helpers'
import { ColocationDataType, CompaniesType }          from '../../../../types/globalTypes'
import { useCookies }                                 from 'react-cookie'
import { useSearchParams }                            from 'react-router-dom'
import SubClientsDrawer                               from './SubClientsDrawer'
import ListItem                                       from './ListItem'
import { useAppDispatch, useAppSelector }             from '../../../../store/hooks'
import { resetIsSubClientAdded, setIsSubClientAdded } from '../../../../auth/AddSubClientReducer/addSubClientReducer'

type SubClientsProps = {
  parentCompanyId:  string | undefined;
  subClientsCollocations :  {
    J13?: ColocationDataType[];
    T72?: ColocationDataType[];
  }
}

const SubClients = ({ parentCompanyId, subClientsCollocations}: SubClientsProps) => {
  const [open, setOpen]                 = useState(false)
  const [subClients, setSubClients]     = React.useState<CompaniesType[]>()
  const [cookies]                       = useCookies()
  const [searchParams, setSearchParams] = useSearchParams()
  const subClientId                     = searchParams.get('subClientId')
  const openSubClientAdditionModal      = useAppSelector((state) => state.modals.openSubClientAdditionModal)
  const dispatch                        = useAppDispatch()
  const addSubClient                    = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)

  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`company/company?parentId=${parentCompanyId}`, cookies.access_token)
        if(companiesSubClients.length > 0){
          setSubClients(companiesSubClients)
        }
      }catch(err){
        console.log(err)
      }
    })()
    return () => {
      dispatch(resetIsSubClientAdded())
    }
  },[openSubClientAdditionModal, addSubClient, open])

  const showDrawer = (subClient: string | undefined) => {
    setSearchParams(`&subClientId=${subClient}`, { replace: true })
    setOpen(true)
  }

  const subClientCompanyRemoved = (id:string) => {
    if(subClients){
      let newCompaniesList = [...subClients]
      newCompaniesList = newCompaniesList.filter(x => x?._id !== id)
      setSubClients(newCompaniesList)
    }
  }

  const deletSubClient = async (subClientId: string | undefined) => {
    if(subClientId ){
      await deleteItem('company/company', {id: subClientId} ,cookies.access_token)
      subClientCompanyRemoved(subClientId)
    }
  }

  const removeFormSubClientList = async(companyId: string | undefined) => {
    if(companyId){
      await put('company/company', {id: companyId, parentId: 'null'} ,cookies.access_token)
      dispatch(setIsSubClientAdded(true))
      subClientCompanyRemoved(companyId)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  const listButtons = (listItemId: string | undefined) => {
    return [
      <Button type='link' onClick={() => showDrawer(listItemId)} key={`${listItemId}`}>Peržiūrėti</Button>,
      <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={`${listItemId}`}>Perkelti</Button>,
      <Button type='link' onClick={() => deletSubClient(listItemId)} key={`${listItemId}`}>Ištrinti</Button>,
    ]
  }

  return (
    <div className='SubClientsContainer'>
      <Divider>Sub Klientai</Divider>
      <List
        locale={{emptyText: 'Nėra pridėtų sub klientų'}}
        dataSource={subClients}
        bordered
        renderItem={(item:  CompaniesType) => {
          return(
            <ListItem
              id={item._id}
              item={item}
              removeFormSubClientList={removeFormSubClientList}
              photosFolder={'../CompanyLogos'}
              altImage={'noImage.jpg'}
              listButtons={listButtons}
            />
          )
        }}/>
      { open &&
      <SubClientsDrawer
        subClientsCollocations={subClientsCollocations}
        subClientId={subClientId}
        onClose={onClose}
        open={open}/>
      }
    </div>
  )
}

export default SubClients