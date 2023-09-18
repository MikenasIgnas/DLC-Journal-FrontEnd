/* eslint-disable max-len */
import React, { useState }                from 'react'
import { Divider, List }                  from 'antd'
import { get }                            from '../../../Plugins/helpers'
import { CompaniesType, ModalStateType }  from '../../../types/globalTypes'
import { useCookies }                     from 'react-cookie'
import { useSearchParams }                from 'react-router-dom'
import SubClientsDrawer                   from './SubClientsDrawer'
import ListItem                           from './ListItem'

type SubClientStateType = {
  mainCompanyAddedAsSubClient:  boolean,
  subClientChangedToMainClient: boolean,
}

type SubClientsProps = {
  parentCompanyId:    string | undefined;
  setModalState:      React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalState:         ModalStateType
  subClientState:     SubClientStateType
  setSubClientState:  React.Dispatch<React.SetStateAction<SubClientStateType>>
}

const SubClients = ({setModalState, modalState, parentCompanyId, subClientState, setSubClientState}: SubClientsProps) => {
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
  },[modalState.isModalOpen, subClientState.subClientChangedToMainClient, subClientState.mainCompanyAddedAsSubClient])

  const showDrawer = (subClient: string | undefined) => {
    setSearchParams(`&subClientId=${subClient}`, { replace: true })
    setOpen(true)
  }

  const deletSubClient = async (subClientId: string | undefined, parentCompanyId: string | undefined ) => {
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

  const removeFormSubClientList = async(companyId: string | undefined) => {
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
        renderItem={(item: CompaniesType) => {
          return(
            <ListItem
              showDrawer={showDrawer}
              deleteListItem={deletSubClient}
              listItemId={item.id}
              photo={item.companyInfo.companyPhoto}
              title={item.companyInfo.companyName}
              description={item.companyInfo.companyDescription}
              subClient={item.wasMainClient}
              removeFormSubClientList={removeFormSubClientList}
              photosFolder={'CompanyLogos'}
              altImage={'noImage.jpg'}
            />
          )
        }}/>
      {
        open &&
      <SubClientsDrawer
        setModalState={setModalState}
        modalState={modalState}
        subClientId={subClientId}
        onClose={onClose}
        open={open}/>
      }
    </div>
  )
}

export default SubClients