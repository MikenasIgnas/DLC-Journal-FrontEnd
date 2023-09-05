/* eslint-disable max-len */
import React, { useState }                from 'react'
import { Avatar, Button, Divider, List }  from 'antd'
import { get }                            from '../../../Plugins/helpers'
import { CompaniesType }                  from '../../../types/globalTypes'
import { useCookies }                     from 'react-cookie'
import { useSearchParams }                from 'react-router-dom'
import SubClientsDrawer                   from './SubClientsDrawer'

type SubClientsProps = {
  parentCompanyId:                  string | undefined;
  isSubclientAdded:                 boolean
  isMainCompanyAddedAsSubClient:    boolean
  setIsMainCompanyAddedAsSubClient: React.Dispatch<React.SetStateAction<boolean>>
}

const SubClients = ({parentCompanyId, isSubclientAdded, isMainCompanyAddedAsSubClient}: SubClientsProps) => {
  const [open, setOpen] =                 useState(false)
  const [subClients, setSubClients] =     React.useState<CompaniesType[]>()
  const [cookies] =                       useCookies()
  const [searchParams, setSearchParams] = useSearchParams()
  const subClientId =                     searchParams.get('subClientId')
  const [subClientChangedToMainClient, setSubClientChangedToMainClient] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`getSubClients?parentCompanyId=${parentCompanyId}`, cookies.access_token)
        setSubClients(companiesSubClients.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[isSubclientAdded, isMainCompanyAddedAsSubClient, subClientChangedToMainClient])

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
    setSubClientChangedToMainClient(true)
    await get(`changeSubClientToMainClient?companyId=${companyId}`, cookies.access_token)
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
      <SubClientsDrawer subClientId={subClientId} onClose={onClose} open={open}/>
    </div>
  )
}

export default SubClients