/* eslint-disable max-len */
import React, { useState }                            from 'react'
import { Button, Divider, List }                              from 'antd'
import { get }                                        from '../../../../Plugins/helpers'
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
        const companiesSubClients = await get(`getSubClients?parentCompanyId=${parentCompanyId}`, cookies.access_token)
        if(companiesSubClients.data.length > 0){
          setSubClients(companiesSubClients.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
    return () => {
      dispatch(resetIsSubClientAdded())
    }
  },[openSubClientAdditionModal, addSubClient, open])

  const showDrawer = (subClient: number | undefined) => {
    setSearchParams(`&subClientId=${subClient}`, { replace: true })
    setOpen(true)
  }
  const subClientCompanyRemoved = (id:number) => {
    if(subClients){
      let newCompaniesList = [...subClients]
      newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
      setSubClients(newCompaniesList)
    }
  }

  const deletSubClient = async (subClientId: number | undefined) => {
    if(subClientId ){
      await get(`deleteCompany?companyId=${subClientId}`, cookies.access_token)
      subClientCompanyRemoved(subClientId)
    }
  }

  const removeFormSubClientList = async(companyId: number | undefined) => {
    if(companyId){
      await get(`changeSubClientToMainClient?companyId=${companyId}`, cookies.access_token)
      dispatch(setIsSubClientAdded(true))
      subClientCompanyRemoved(companyId)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  const listButtons = (listItemId: number | undefined, primaryKey: number | undefined, wasMainClient?: boolean) => {
    if(wasMainClient){
      const buttons = [
        <Button type='link' onClick={() => showDrawer(listItemId)} key={listItemId}> Peržiūrėti </Button>,
        <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={listItemId}> Perkelti </Button>,
        <Button type='link' onClick={() => deletSubClient(listItemId)} key={listItemId}>Ištrinti</Button>,
      ]
      return buttons
    }else{
      const buttons = [
        <Button type='link' onClick={() => showDrawer(listItemId)} key={listItemId}>Peržiūrėti</Button>,
        <Button type='link' onClick={() => deletSubClient(listItemId)} key={listItemId}>Ištrinti</Button>,
      ]
      return buttons
    }
  }
  return (
    <div className='SubClientsContainer'>
      <Divider>Sub Klientai</Divider>
      <List
        locale={{emptyText: 'Nėra pridėtų sub klientų'}}
        dataSource={subClients}
        bordered
        renderItem={(item) => {
          return(
            <ListItem
              listItemId={item?.id}
              primaryKey={item.parentCompanyId}
              photo={item?.companyInfo?.companyPhoto}
              title={item?.companyInfo?.companyName}
              description={item?.companyInfo?.companyDescription}
              wasMainClient={item?.wasMainClient}
              removeFormSubClientList={removeFormSubClientList}
              photosFolder={'../CompanyLogos'}
              altImage={'noImage.jpg'}
              listButtons={listButtons} />
          )
        }}/>
      { open &&
      <SubClientsDrawer
        subClientsCollocations={subClientsCollocations}
        subClientId={Number(subClientId)}
        onClose={onClose}
        open={open}/>
      }
    </div>
  )
}

export default SubClients