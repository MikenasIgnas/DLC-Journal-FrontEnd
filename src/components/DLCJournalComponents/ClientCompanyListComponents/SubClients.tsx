/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useState }                from 'react'
import { Avatar, Button, Divider, List }  from 'antd'
import { get }                            from '../../../Plugins/helpers'
import { CompaniesType, ModalStateType }  from '../../../types/globalTypes'
import { useCookies }                     from 'react-cookie'
import { useSearchParams }                from 'react-router-dom'
import SubClientsDrawer                   from './SubClientsDrawer'

type SubClientStateType = {
  mainCompanyAddedAsSubClient:  boolean,
  subClientChangedToMainClient: boolean,
}

type SubClientsProps = {
  parentCompanyId:                  string | undefined;
  setModalOpen:                     React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalOpen:                        ModalStateType
  subClientState:                   SubClientStateType
  setSubClientState:                React.Dispatch<React.SetStateAction<SubClientStateType>>
}

const SubClients = ({setModalOpen,modalOpen, parentCompanyId, subClientState, setSubClientState}: SubClientsProps) => {
  const [open, setOpen] =                 useState(false)
  const [subClients, setSubClients] =     React.useState<CompaniesType[]>()
  const [cookies] =                       useCookies()
  const [searchParams, setSearchParams] = useSearchParams()
  const subClientId =                     searchParams.get('subClientId')

  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`getSubClients?parentCompanyId=${parentCompanyId}`, cookies.access_token)
        setSubClients(companiesSubClients.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[modalOpen.isModalOpen, subClientState.subClientChangedToMainClient, subClientState.mainCompanyAddedAsSubClient])

  const showDrawer = (subClient: CompaniesType) => {
    setSearchParams(`&subClientId=${subClient.id}`, { replace: true })
    setOpen(true)
  }

  const deletSubClient = async(subClientId: string, parentCompanyId: string | undefined ) => {
    if(subClientId ){
      await get(`deleteCompaniesSubClient?subClientId=${subClientId}&parentCompanyId=${parentCompanyId}`, cookies.access_token)
      subClientCompanyRemoved(subClientId)
    }
  }
  const subClientCompanyRemoved = (id:string) => {
    if(subClients){
      let newCompaniesList = [...subClients]
      newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
      setSubClients(newCompaniesList)
    }
  }

  const removeFormSubClientList = async(companyId: string) => {
    const res = await get(`changeSubClientToMainClient?companyId=${companyId}`, cookies.access_token)
    if(!res.error){
      setSubClientState({...subClientState, subClientChangedToMainClient: !subClientState.subClientChangedToMainClient})
    }
  }

  const onClose = () => {
    setOpen(false)
  }



  return (
    <div style={{width: '49%'}}>
      <Divider>Sub Klientai</Divider>
      <List
        dataSource={subClients}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button type='link' onClick={() => showDrawer(item)} key={item.id}>
              Peržiūrėti
              </Button>,
              item?.wasMainClient === true && <Button type='link' onClick={() => removeFormSubClientList(item.id)} key={item.id}> Perkelti </Button>,
              <Button type='link' onClick={() => deletSubClient(item?.id, item?.parentCompanyId)} key={item.id}>
                  Ištrinti
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={
                  <img
                    src={`../CompanyLogos/${item.companyInfo.companyPhoto ? item.companyInfo.companyPhoto : 'noImage.jpg'}`}
                    alt='err' />}
                />}
              title={item.companyInfo.companyName}
              description={item.companyInfo.companyDescription}
            />
          </List.Item>
        )}
      />
      <SubClientsDrawer
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        subClientId={subClientId}
        onClose={onClose}
        open={open}/>
    </div>
  )
}

export default SubClients